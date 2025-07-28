import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";
import type { Context } from "hono";
import { generateIcal } from "../../utils/ical";
import { render } from "@react-email/render";
import NewMeeting from "../../emails/azelysse/NewMeeting";
import { resend } from "../../lib/resend";
import { FROM, INFORMATIONS, CONTENT } from "../../utils/azelysseUtils";
import AfterMeeting from "../../emails/azelysse/AfterMeeting";
import CancelMeeting from "../../emails/azelysse/CancelMeeting";
import type { AzelysseMeeting } from "../../types/azelysse.types";

const CLIENT = {
  first_name: "Clement",
  email: "osternaud.clement@pm.me",
};

const MEETING: AzelysseMeeting = {
  id: "e7b8c2a0-9f4e-4a7b-8e2d-1c2f3a4b5c6d", // Example UUID
  start_time: new Date("2024-02-01T14:00:00Z"),
  client: CLIENT,
  prestations: [
    {
      service: {
        name: "Pose de bijoux",
        duration: 20,
      },
    },
    {
      service: {
        name: "Acte de piercing",
        duration: 20,
      },
      product: {
        name: "Hélix",
        price: 40,
        aget_restriction: 16,
      },
    },
  ],
};

export const sendConfirmationEmail = async (c: Context) => {
  try {
    const meeting = MEETING;

    const formatedDate = formatInTimeZone(
      meeting.start_time,
      "Europe/Paris",
      "EEEE dd MMMM yyyy à HH:mm",
      { locale: fr }
    );

    const ical = generateIcal(meeting);

    const html = await render(
      <NewMeeting
        meeting={MEETING}
        informations={INFORMATIONS}
        linkUpdate={`https://azelysse.fr/modification?id=${MEETING.id}`}
        linkCancel={`https://azelysse.fr/modification?id=${MEETING.id}`}
        content={CONTENT}
      />,
      { pretty: true }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [MEETING.client?.email],
      subject: `Confirmation de votre rendez-vous ${formatedDate} | Azelysse Piercing`,
      html,
      attachments: [
        {
          content: ical.toString(),
          filename: "calendar.ics",
        },
      ],
    });
    return c.json({ success: true });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return c.json(
      { success: false, error: "Failed to send confirmation email" },
      500
    );
  }
};

export const sendCancelMeetingEmail = async (c: Context) => {
  try {
    const formatedDate = formatInTimeZone(
      MEETING.start_time,
      "Europe/Paris",
      "EEEE dd MMMM yyyy à HH:mm",
      { locale: fr }
    );

    if (!MEETING.client?.email) {
      return;
    }

    const html = await render(
      <CancelMeeting meeting={MEETING} content={CONTENT} />,
      {
        pretty: true,
      }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [MEETING.client?.email],
      subject: `Annulation de votre rendez-vous ${formatedDate} | Azelysse Piercing`,
      html,
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error sending cancellation email:", error);
    return c.json(
      { success: false, error: "Failed to send cancellation email" },
      500
    );
  }
};

export const sendAfterMeetingEmail = async (c: Context) => {
  try {
    const html = await render(
      <AfterMeeting firstname={CLIENT.first_name} content={CONTENT} />,
      {
        pretty: true,
      }
    );

    return await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [CLIENT.email],
      subject: `Laissez un avis sur votre dernier rendez-vous | Azelysse Piercing`,
      html,
    });
  } catch (error) {
    console.error("Error sending after meeting email:", error);
    return c.json(
      { success: false, error: "Failed to send after meeting email" },
      500
    );
  }
};
