import { Hr, Img, Section } from "@react-email/components";
import * as React from "react";

const Header = () => (
  <Section>
    <Section className="pt-4">
      <Img
        src="https://admin.azelysse.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.324e3e80.png&w=1080&q=75"
        width="244"
        height="93"
        alt="Azelyse Piercing"
        style={{ margin: "auto" }}
      />
    </Section>
    <Hr />
  </Section>
);

export default Header;
