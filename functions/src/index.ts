import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as twilio from 'twilio';
import { PubSub } from '@google-cloud/pubsub';

admin.initializeApp();

const { from, sid, auth } = functions.config().twilio;
const { projectId } = admin.app().options;
const client = twilio(sid, auth);
const db = admin.app().firestore();
const ps = new PubSub();

const region = `us-central1`;
const functionUrl = (method: string) => `https://${region}-${projectId}.cloudfunctions.net/${method}`;
db.settings({timestampsInSnapshots: true});

export const callme = functions.pubsub.topic('callme').onPublish(async (msg, ctx) => {
  const body = JSON.parse(Buffer.from(msg.data, 'base64').toString());
  await db.collection('Event').doc(ctx.eventId).set(body);
  await client.calls.create({to: body.to, from,
    url: functionUrl(`callSpecs?id=${ctx.eventId}`),
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    statusCallback: functionUrl(`callCallback?id=${ctx.eventId}`)
  });
});

export const callSpecs = functions.https.onRequest(async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({
    voice: 'alice'
  }, `Hey there! What is your favorite fruit?`);
  twiml.record({
    timeout: 10,
    transcribeCallback: functionUrl(`transcriptionCallback?id=${req.query.id}`)
  });
  twiml.hangup();
  res.status(200).send(twiml.toString());
})

export const callCallback = functions.https.onRequest(async (req, res) => {
  await db.collection('Event').doc(req.query.id)
          .collection('Call').doc(req.body.CallSid)
          .set(req.body);
  res.status(200).send();
});

export const transcriptionCallback = functions.https.onRequest(async (req, res) => {
  await db.collection('Event').doc(req.query.id)
          .collection('Call').doc(req.body.CallSid)
          .collection('Transcription').doc(req.body.TranscriptionSid)
          .set(req.body);
  res.status(200).send();
});

export const pubEvent = functions.https.onCall((nums: string[]) => {
  const publisher = ps.topic('callme').publisher();
  return Promise.all(nums.map(n => publisher.publish(
    Buffer.from(JSON.stringify({to: n}))
  )));
});
