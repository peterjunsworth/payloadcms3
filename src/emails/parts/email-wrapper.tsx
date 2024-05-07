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
  
  export default function EmailWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
    return (
      <Html>
        <Head />
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
                <>
                  {children}
                </>
                <Hr style={hr} />
                <Text className="text-gray-600 text-base text-center">
                  &copy; Smover, Inc. All rights reserved. 
                </Text>
                <Text className="text-gray-600 text-base text-center">
                  If you have any questions please
                  <Link
                      href="mailto:help@smover.com"
                      color="primary"
                      className="m-1"
                  >
                      contact us
                  </Link>
                </Text>
                <Text className="text-gray-600 text-base text-center">
                  <Link
                      href="https://smover.com/privacy"
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