import express from 'express';
import { verifyWebhook } from '@clerk/express/webhooks';
import {PrismaClient} from "../generated/prisma/index.js"

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    console.log("We got a signal")
    try {
      const evt = await verifyWebhook(req)
  
      // Do something with payload
      // For this guide, log payload to console
      const { id } = evt.data
      if (evt.type === 'user.created') {
        const data = evt.data
        const newUser = await prisma.user.create({
          data: {
            username : data.username,
            clerkId : data.id 
          },
        })
      
      }
      if (evt.type === 'user.updated') {
        const data = evt.data
        const updatedUser = await prisma.user.update({
          where: {
            clerkId: data.id,
          },
          data: {
            username : data.username,
          },
        })
  
        }
      if (evt.type === 'user.deleted') {
        const data = evt.data
        const deletedUser = await prisma.user.delete({
          where: {
            clerkId: data.id,
          },
        })
      }
      return res.send('Webhook received')
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return res.status(400).send('Error verifying webhook')
    }
  })
export default router;