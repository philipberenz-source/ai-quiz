import { verifyWebhook } from "@clerk/express/webhooks";

export const createWebhookController = ({ webhookService, verifyWebhookFn = verifyWebhook }) => ({
  async receiveWebhook(req, res) {
    try {
      const evt = await verifyWebhookFn(req);
      await webhookService.handleEvent(evt);
      res.send("Webhook received");
    } catch (error) {
      console.error("Error verifying webhook:", error);
      res.status(400).send("Error verifying webhook");
    }
  },
});
