"use strict";

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({});

module.exports.createContact = async (event) => {
  console.log("Received:", event);

  const { to, from, subject, message } = JSON.parse(event.body);

  if (!to || !from || !subject || !message) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify({
        message: "to, from, subject or message are missing",
      }),
    };
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: message,
        },
      },
    },
    Source: from,
  };

  try {
    await sesClient.send(new SendEmailCommand(params));

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully!",
        success: true,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 500,
      body: JSON.stringify({
        message: "The email failed to send",
        success: false,
      }),
    };
  }
};
