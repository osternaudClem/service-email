import {
  Body,
  Column,
  Container,
  Hr,
  Row,
  Section,
} from "@react-email/components";
import * as React from "react";

import Footer from "./Footer";
import type { AzelysseContent } from "../../../types/azelysse.types";

type Props = {
  children: React.ReactNode | Array<React.ReactNode>;
  content: AzelysseContent;
};

const BodyWrapper = ({ children, content }: Props) => (
  <Body className="bg-amber-50">
    <Section className="py-4" />
    <Container className="rounded-xl bg-white font-sans">
      <Row>
        <Column className="w-[20px] md:w-[40px]" />
        <Column>{children}</Column>
        <Column className="w-[20px] md:w-[40px]" />
      </Row>
    </Container>
    <Section className="py-4" />
    <Container className="font-sans">
      <Row>
        <Column className="w-[20px] md:w-[40px]" />
        <Column>
          <Hr />
          <Footer content={content} />
        </Column>
        <Column className="w-[20px] md:w-[40px]" />
      </Row>
    </Container>
  </Body>
);

export default BodyWrapper;
