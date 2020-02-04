import { google } from "googleapis";

const googleConfig = {
  clientId: "<GOOGLE_CLIENT_ID>", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: "<GOOGLE_CLIENT_SECRET>", // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: "https://your-website.com/google-auth" // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}
