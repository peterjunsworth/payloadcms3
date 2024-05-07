import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text
  } from "@react-email/components";
  import * as React from "react";
  
  const imgUrl = process.env.BASE_URL
    ? `${process.env.BASE_URL}`
    : "";

  
  export default function EmailWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
    return (
      <Html>
        <Head />
        <Preview>You're now ready to make live transactions with Stripe!</Preview>
        <Body style={main}>
          <Tailwind
            config={{
              theme: {
                extend: {
                  colors: {
                    brand: "#4639ca",
                  },
                },
              },
            }}
          >
            <Container className="bg-white mx-auto pt-[20px] pb-[48px] mb-[64px]">
              <Section className="px-12">
                <Img
                  src={`${imgUrl}/kv-logo.png`}
                  alt="Kanvarta Logo"
                  width={70}
                  height="auto"
                  className="mx-auto"
                />
                <>
                  {children}
                </>
                <Hr style={hr} />
                <Text className="text-gray-600 text-base text-center">
                  &copy; Kanvarta, LLC. All rights reserved. 
                </Text>
                <Text className="text-gray-600 text-base text-center">
                  If you have any questions please
                  <Link
                      href="mailto:help@kanvarta.com"
                      color="primary"
                      className="m-1"
                  >
                      contact us
                  </Link>
                </Text>
                <Text className="text-gray-600 text-base text-center">
                  <Link
                      href="https://kanvarta.com/privacy"
                      color="primary"
                      className="m-1"
                  >
                      Privacy Policy
                  </Link>
                </Text>
              </Section>
            </Container>
          </Tailwind>
        </Body>
      </Html>
    );
  }
  
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };