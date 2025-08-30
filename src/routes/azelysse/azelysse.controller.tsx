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
import UpdateMeeting from "../../emails/azelysse/UpdateMeeting";

export const sendConfirmationEmail = async (c: Context) => {
  try {
    const meeting = await c.req.json();

    const formatedDate = formatInTimeZone(
      meeting.start_time,
      "Europe/Paris",
      "EEEE dd MMMM yyyy à HH:mm",
      { locale: fr }
    );

    const ical = generateIcal(meeting);

    const html = await render(
      <NewMeeting
        meeting={meeting}
        informations={INFORMATIONS}
        linkUpdate={`https://azelysse.fr/modification?id=${meeting.id}`}
        linkCancel={`https://azelysse.fr/modification?id=${meeting.id}`}
        content={CONTENT}
      />,
      { pretty: true }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [meeting.client?.email],
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

export const sendUpdateMeetingEmail = async (c: Context) => {
  try {
    const meeting = await c.req.json();

    const formatedDate = formatInTimeZone(
      meeting.start_time,
      "Europe/Paris",
      "EEEE dd MMMM yyyy à HH:mm",
      { locale: fr }
    );

    const html = await render(
      <UpdateMeeting
        meeting={meeting}
        informations={INFORMATIONS}
        linkUpdate={`https://azelysse.fr/modification?id=${meeting.id}`}
        linkCancel={`https://azelysse.fr/modification?id=${meeting.id}`}
        content={CONTENT}
      />,
      { pretty: true }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [meeting.client?.email],
      subject: `Modification de votre rendez-vous ${formatedDate} | Azelysse Piercing`,
      html,
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error sending update email:", error);
    return c.json(
      { success: false, error: "Failed to send update email" },
      500
    );
  }
};

export const sendCancelMeetingEmail = async (c: Context) => {
  try {
    const meeting = await c.req.json();

    const formatedDate = formatInTimeZone(
      meeting.start_time,
      "Europe/Paris",
      "EEEE dd MMMM yyyy à HH:mm",
      { locale: fr }
    );

    if (!meeting.client?.email) {
      return;
    }

    const html = await render(
      <CancelMeeting meeting={meeting} content={CONTENT} />,
      {
        pretty: true,
      }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [meeting.client?.email],
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
    const client = await c.req.json();

    const html = await render(
      <AfterMeeting firstname={client.first_name} content={CONTENT} />,
      {
        pretty: true,
      }
    );

    await resend.emails.send({
      from: `Azelysse Piercing <${FROM}>`,
      to: [client.email],
      subject: `Laissez un avis sur votre dernier rendez-vous | Azelysse Piercing`,
      html,
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error sending after meeting email:", error);
    return c.json(
      { success: false, error: "Failed to send after meeting email" },
      500
    );
  }
};
