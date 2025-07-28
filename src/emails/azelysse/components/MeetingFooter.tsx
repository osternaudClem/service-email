import { Column, Link, Row, Section, Text } from "@react-email/components";
import * as React from "react";

import Icon from "./Icon";

type Props = {
  linkUpdate: string;
  linkCancel: string;
};

const MeetingFooter = ({ linkCancel, linkUpdate }: Props) => (
  <Section>
    <Row>
      <Column className="text-center">
        <Link href={linkUpdate}>
          <Icon name="calendar-edit" size={24} alt="Calendrier" center />
          <Text className="my-0">Modifier le RDV</Text>
        </Link>
      </Column>
      <Column className="text-center">
        <Link href={linkCancel}>
          <Icon name="close" size={24} alt="Calendrier" center />
          <Text className="my-0">Annuler le RDV</Text>
        </Link>
      </Column>
    </Row>
  </Section>
);

export default MeetingFooter;
