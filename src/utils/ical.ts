import ical, { ICalCalendarMethod } from "ical-generator";
import type { AzelysseMeeting } from "../types/azelysse.types";

export const generateIcal = (meeting: AzelysseMeeting) => {
  const calendar = ical({ name: "Rendez vous avec Azelysse Piercing" });
  calendar.method(ICalCalendarMethod.REQUEST);

  const prestations = meeting.prestations?.map((prestation) => {
    return `${prestation.service.name} ${
      prestation.product ? ` (${prestation.product.name})` : ""
    }`;
  });

  calendar.createEvent({
    start: meeting.start_time,
    end: meeting.end_time,
    summary: "Azelysse Piercing",
    organizer: {
      name: "Azelysse Piercing",
      email: "azelysse.piercing@gmail.com",
    },
    description: {
      plain: prestations?.join(", ") || "",
    },
    location: "6 Rue Molière, 91520 Égly",
    url: "https://azelysse.fr/",
  });

  return calendar;
};
