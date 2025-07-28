import { Column, Link, Row, Section, Text } from "@react-email/components";

import Icon from "./Icon";
import type { AzelysseContent } from "../../../types/azelysse.types";

type Props = {
  content: AzelysseContent;
};

const Footer = ({ content }: Props) => (
  <Section>
    <Text className="mb-0 text-sm font-semibold">Me contacter</Text>
    <Row className="hidden sm:table">
      <Column valign="top">
        <Text className="mb-0 text-sm">Adresse</Text>
        <Text className="mt-0 text-sm">{content.contact_address}</Text>
        <Text className="mb-0 text-sm">Téléphone</Text>
        <Text className="mt-0 text-sm">{content.contact_phone_number}</Text>
      </Column>
      <Column valign="top">
        <Text className="mb-0 flex text-sm">
          <Icon name="instagram" />
          <span className="ml-2 pt-0.5">Instagram</span>
        </Text>
        <Text className="mt-0 items-center text-sm">
          <Link href={content.instagram_link} className="mt-0 text-sm">
            {content.instagram_username}
          </Link>
        </Text>
        <Text className="mb-0 flex text-sm">
          <Icon name="facebook" />
          <span className="ml-2 pt-0.5">Facebook</span>
        </Text>
        <Text className="mt-0 items-center text-sm">
          <Link href={content.facebook_link} className="mt-0 text-sm">
            Azelysse Piercing
          </Link>
        </Text>{" "}
        <Text className="mb-0 flex text-sm">
          <Icon name="earth" />
          <span className="ml-2 pt-0.5">Site internet</span>
        </Text>
        <Text className="mt-0 items-center text-sm">
          <Link href="https://azelysse.fr/" className="mt-0 text-sm">
            https://azelysse.fr
          </Link>
        </Text>
      </Column>
    </Row>
    <Section className="sm:hidden">
      <Text className="mb-0 text-sm">Adresse</Text>
      <Text className="mt-0 text-sm">{content.contact_address}</Text>
      <Text className="mb-0 text-sm">Téléphone</Text>
      <Text className="mt-0 text-sm">{content.contact_phone_number}</Text>
      <Text className="mb-0 flex text-sm">
        <Icon name="instagram" />
        <span className="ml-2 pt-0.5">Instagram</span>
        <Link href={content.instagram_link} className="mt-0.5 ml-auto text-sm">
          {content.instagram_username}
        </Link>
      </Text>
      <Text className="mb-0 flex text-sm">
        <Icon name="facebook" />
        <span className="ml-2 pt-0.5">Facebook</span>
        <Link href={content.facebook_link} className="mt-0.5 ml-auto text-sm">
          Azelysse Piercing
        </Link>
      </Text>
      <Text className="mb-0 flex text-sm">
        <Icon name="earth" />
        <span className="ml-2 pt-0.5">Site internet</span>
        <Link href="https://azelysse.fr/" className="mt-0.5 ml-auto text-sm">
          https://azelysse.fr
        </Link>
      </Text>
    </Section>
  </Section>
);

export default Footer;
