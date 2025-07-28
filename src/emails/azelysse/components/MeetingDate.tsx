import { Column, Row, Section, Text } from "@react-email/components";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";
import * as React from "react";
import type { AzelysseMeeting } from "../../../types/azelysse.types";

type Props = {
  date: Date;
  meeting: AzelysseMeeting;
};

const MeetingDate = ({ date, meeting }: Props) => {
  const prestations = meeting.prestations || [];
  return (
    <Section className="py-4">
      <Row>
        <Column>
          <Text className="my-1">
            Le{" "}
            <span className="capitalize">
              {format(date, "dd LLLL yyyy", { locale: fr })}
            </span>{" "}
            {formatInTimeZone(date, "Europe/Paris", "à HH:mm", { locale: fr })}
          </Text>

          {prestations?.map((prestation, index) => {
            return (
              <Text key={index}>
                - {prestation.service.name}
                {prestation.product ? ` (${prestation.product.name})` : ""}
              </Text>
            );
          })}
        </Column>
        <Column valign="top" align="right">
          <Text className="my-0 text-4xl font-bold">
            {format(date, "dd", { locale: fr })}
          </Text>
          <Text className="my-0 text-xl capitalize">
            {format(date, "LLL", { locale: fr })}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

MeetingDate.PreviewProps = {
  date: new Date("2024-02-01T14:00:00Z"), // ISO String for date
  meeting: {
    client: {
      firstname: "Clement",
    },
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
          age_restriction: 16,
        },
      },
    ],
  },
};

export default MeetingDate;
