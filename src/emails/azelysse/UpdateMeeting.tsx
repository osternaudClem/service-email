import {
  Column,
  Head,
  Hr,
  Html,
  Link,
  Markdown,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";
import type { ReactElement } from "react";

import BodyWrapper from "./components/BodyWrapper";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Info from "./components/Info";
import MeetingDate from "./components/MeetingDate";
import MeetingFooter from "./components/MeetingFooter";
import type {
  AzelysseContent,
  AzelysseMeeting,
} from "../../types/azelysse.types";

type Props = {
  meeting: AzelysseMeeting;
  informations: Array<string>;
  linkUpdate: string;
  linkCancel: string;
  content: AzelysseContent;
};

const UpdateMeeting = ({
  meeting,
  informations = [],
  linkUpdate,
  linkCancel,
  content,
}: Props): ReactElement => {
  const date = meeting.start_time;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Modification de rendez-vous.</Preview>
        <BodyWrapper content={content}>
          <Header />
          <Section className="py-4 text-center">
            <Icon
              name="calendar-edit"
              size={24}
              alt="Azelyse Piercing"
              center
            />
            <Text className="mb-0 mt-2 font-bold">Réservation modifiée</Text>
          </Section>
          <Hr />
          {date ? <MeetingDate date={date} meeting={meeting} /> : null}
          <Hr />
          <Section>
            <Text className="font-semibold">
              Bonjour {meeting.client?.first_name},
            </Text>
            <Text>
              Je vous confirme que votre rendez-vous chez{" "}
              <Link href="https://azelysse.fr" className="font-semibold">
                Azelysse Piercing
              </Link>{" "}
              a bien été modifié. Voici les détails de votre rendez-vous :
            </Text>
          </Section>
          <Section>
            <Text>Prestation(s):</Text>
            {meeting.prestations?.map((prestation, index) => (
              <Text key={index}>
                - {prestation.service.name}
                {prestation.product ? ` (${prestation.product.name})` : ""}
              </Text>
            ))}
          </Section>
          <Hr />
          <Section className="pt-2">
            <Row>
              <Column className="w-[40px]" valign="top">
                <Icon name="info" size={24} alt="Information" />
              </Column>
              <Column>
                <Text className="font-semibold" style={{ marginTop: 0 }}>
                  Informations
                </Text>
                {informations.map((information, index) => (
                  <Markdown
                    key={`info-${index}`}
                    markdownCustomStyles={{
                      p: { fontSize: "14px" },
                    }}
                    children={information}
                  />
                ))}
              </Column>
            </Row>
            <Info content={content} />
          </Section>
          <Hr />
          <MeetingFooter linkUpdate={linkUpdate} linkCancel={linkCancel} />
        </BodyWrapper>
      </Html>
    </Tailwind>
  );
};

UpdateMeeting.PreviewProps = {
  message: "Voir le rendez-vous",
  informations: [
    "**Ne soyez pas en retard** : Assurez-vous d'arriver à l'heure pour votre rendez-vous afin que je puisse vous recevoir dans les meilleures conditions.",
    "**Mineurs** : Si vous êtes mineur et que la prestation de piercing est autorisée, veuillez venir accompagné d'un tuteur légal pour signer l'autorisation.",
    "**Préparez-vous** : Assurez-vous d'avoir pris toutes les précautions nécessaires avant votre rendez-vous, comme éviter de consommer de l'alcool ou des substances pouvant affecter votre état.",
    "**Soins post-piercing** : Après votre piercing, suivez attentivement les instructions de soin que je vous fournirai pour assurer une guérison optimale et éviter les complications.",
  ],
  link_update: "https://example.com",
  link_cancel: "https://example.com",
  meeting: {
    start_time: new Date("2024-02-01T14:00:00Z"),
    client: {
      first_name: "Clement",
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
  content: {
    instagram_link: "https://instagram.com/azelysse.piercing",
    phone_number: "",
    contact_email: "azelysse.piercing@gmail.com",
    contact_phone_number: "01 64 95 93 45",
    contact_address: "Ocus Picus - 6 Rue Molière, 91520 Égly",
    facebook_link: "https://www.facebook.com/profile.php?id=61559963151913",
    instagram_username: "@azelysse.piercing",
    google_review_link:
      "https://www.google.com/search?sca_esv=acc4d604aee1a7ed&sca_upv=1&rlz=1C5GCEM_en&sxsrf=ADLYWIJsxcsiP82gA_E72zzOV2yHa3-ndA:1716040857147&uds=ADvngMjcH0KdF7qGWtwTBrP0nt7dUc3nybvm3mFj5CS_k8aUoazqPFtiJ22aFJvwn_AvGST6_f9_piNfIBwF-X7iPx3dGGYPOlx2erWMEZ4HYKNW00_YX0C7O7LB1wi01A11s1lCksuc&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7getqQADe496G1osng-rmMtT4MHJyVnKaqaGL9tghtzeeD6yY87a3njhm7MTAXwsIHZmvLM%3D&q=Azelysse+Piercing+Reviews&sa=X&ved=2ahUKEwjTg9etrpeGAxVdVqQEHWLODOEQ3PALegQISRAF&biw=2560&bih=1295&dpr=1",
    google_maps_link:
      "https://www.google.com/maps/dir//6+Rue+Moli%C3%A8re,+91520+%C3%89gly/@48.580885,2.2256588,17z/data=!4m18!1m8!3m7!1s0x47e5d0f43c54c8e9:0x949c721d28da1fbe!2zNiBSdWUgTW9sacOocmUsIDkxNTIwIMOJZ2x5!3b1!8m2!3d48.580885!4d2.2282391!16s%2Fg%2F11c197xqr4!4m8!1m0!1m5!1m1!1s0x47e5d0f43c54c8e9:0x949c721d28da1fbe!2m2!1d2.2282391!2d48.580885!3e3?entry=ttu",
  },
};

export default UpdateMeeting;
