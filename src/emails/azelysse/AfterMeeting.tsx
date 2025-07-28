import {
  Button,
  Column,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

import BodyWrapper from "./components/BodyWrapper";
import StyledButton from "./components/Button";
import Header from "./components/Header";
import Icon from "./components/Icon";
import type { AzelysseContent } from "../../types/azelysse.types";

type Props = {
  firstname: string;
  content: AzelysseContent;
};

const AfterMeeting = ({ firstname, content }: Props) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Donnez votre avis.</Preview>
        <BodyWrapper content={content}>
          <>
            <Header />
            <Section className="py-4 text-center">
              <Icon name="star" size={24} alt="Icon étoile" center />
              <Text className="mb-0 mt-2 font-bold">
                Comment s'est passé votre RDV ?
              </Text>
            </Section>
            <Hr />
            <Section>
              <Text className="font-bold">
                {firstname}, laissez moi votre avis
              </Text>
              <Row>
                <Column>
                  <Button
                    href={content.google_review_link}
                    className="mr-1 w-full rounded-md bg-[#4285F4] py-1.5 text-center font-medium text-white hover:bg-[#4285F4]/90 md:py-2.5"
                  >
                    <span
                      className="align-middle"
                      style={{ display: "inherit" }}
                    >
                      <Icon name="google--white" size={24} alt="Google icon" />
                    </span>
                    <span
                      className="pl-2 align-middle text-xs text-white"
                      style={{ display: "inherit" }}
                    >
                      Sur Google
                    </span>
                  </Button>
                </Column>
                <Column align="right">
                  {/* @ts-ignore */}
                  <Button
                    href={content.facebook_link}
                    className="ml-1 w-full rounded-md bg-[#1877F2] py-1.5 text-center font-medium text-white hover:bg-[#1877F2]/90 md:py-2.5"
                  >
                    <span
                      className="align-middle"
                      style={{ display: "inherit" }}
                    >
                      <Icon
                        name="facebook--white"
                        size={24}
                        alt="Facebook icon"
                      />
                    </span>
                    <span
                      className="pl-2 align-middle text-xs text-white"
                      style={{ display: "inherit" }}
                    >
                      Sur Facebook
                    </span>
                  </Button>
                </Column>
              </Row>
              <Text className="text-sm">
                Cela me permet de maintenir une qualité toujours irréprochable !
              </Text>
            </Section>
            <Hr />
            <Section className="my-4 text-center">
              <StyledButton href="https://azelysse.fr">
                Prendre un nouveau rendez-vous
              </StyledButton>
            </Section>
          </>
        </BodyWrapper>
      </Html>
    </Tailwind>
  );
};

AfterMeeting.PreviewProps = {
  firstname: "Clément",
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

export default AfterMeeting;
