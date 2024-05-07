import EmailWrapper from "./parts/email-wrapper"
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind
  } from "@react-email/components";
  import * as React from "react";

  
  export default function MagicLinkEmail({ 
    magicLink
  }: { 
    magicLink: string
  }) {
  
    return (
      <EmailWrapper>
        <Text className="text-gray-600 text-base text-center">
          Click and confirm that you want to sign in to Kanvarta. This link will expire in 15 minutes.
        </Text>
        <Button className="bg-brand rounded-lg text-white text-base font-bold text-center w-full p-3" href={magicLink}>
          Sign in to Kanvarta
        </Button>
        <Text className="text-gray-600 mt-8 text-base text-center">
          Or sign in using this link:
        </Text>
        <Text className="text-gray-600 text-base text-center">
          {magicLink}
        </Text>
        <Text className="text-gray-600 mt-8 text-base text-center">
          Thanks
        </Text>
        <Text className="text-gray-600 text-base font-bold text-center">
          The Kanvarta Team
        </Text>
      </EmailWrapper>
    );
  }
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };