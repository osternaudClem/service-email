import { Column, Link, Row, Text } from "@react-email/components";

import Icon from "./Icon.js";
import type { AzelysseContent } from "../../../types/azelysse.types.js";

type Props = {
  content: AzelysseContent;
};

const Info = ({ content }: Props) => (
  <Row className="pt-2">
    <Column className="w-[40px]" valign="top">
      <Icon name="location" size={24} alt="Location" />
    </Column>
    <Column>
      <Text className="font-semibold" style={{ marginTop: 0 }}>
        Adresse
      </Text>
      <Text>{content.contact_address}</Text>
      <Link href={content.google_maps_link}>
        <Text className="text-blue-700">Voir l'itinéraire</Text>
      </Link>
    </Column>
  </Row>
);

export default Info;
