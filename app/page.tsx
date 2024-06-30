"use client";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card } from "@nextui-org/card";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import React from 'react';
import { Image } from "@nextui-org/image";

const features = [
  {
    title: "Own ecosystem",
    description:
      'Develop any modifications for all supported projects in one application.',
  },
  {
    title: "Developer support",
    description:
      "You will receive real money for approval of your work for our projects.",
  },
  {
    title: "Workshop",
    description:
      "Share your templates with other developers through our network!",
  },
  {
    title: "Free support",
    description:
      "We offer a free plan for non-profits with unrestricted access to all services.",
  },
  {
    title: "Advance access",
    description:
      "Get preview builds of projects before regular users by joining the developer program.",
  },
  {
    title: "Seamless integration",
    description:
      "Using our proprietary technologies, you can test your modifications at breakneck speed.",
  },
];

export default function Home() {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const handleDownload = async (key: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(`https://api.screwltd.com/v3/editor/download?${key}=true`);
      const data = await response.json();
      const url = data.url;

      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGithub = () => {
    window.open(siteConfig.links.github, '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:support@screwltd.com');
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Create your own content&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>quickly&nbsp;</h1>
          <br />
          <h1 className={title()}>and&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>easily&nbsp;</h1>
        </div>

        <div className="flex gap-3">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                isLoading={isDownloading}
                className={buttonStyles({
                  color: "secondary",
                  radius: "full",
                  variant: "shadow",
                })}
              >
                Download
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" color="secondary" aria-label="Static Actions">
              <DropdownSection showDivider title="Stable versions">
                <DropdownItem key="win64" onClick={() => handleDownload('win64')}>
                  Windows installer (64-bit)
                </DropdownItem>
                <DropdownItem key="arm_exe" onClick={() => handleDownload('arm_exe')}>
                  Windows installer (ARM64)
                </DropdownItem>
                <DropdownItem key="win64_zip" onClick={() => handleDownload('win64_zip')}>
                  Windows embeddable package (64-bit)
                </DropdownItem>
                <DropdownItem key="arm_zip" onClick={() => handleDownload('arm_zip')}>
                  Windows embeddable package (ARM64)
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Danger zone">
                <DropdownItem
                  key="win32"
                  description="Installing the 32-bit version is not recommended."
                  onClick={() => handleDownload('win32')}
                  className="text-danger"
                  color="danger"
                >
                  Windows installer (32-bit)
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Button
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            onClick={handleGithub}
          >
            <GithubIcon size={20} />
            GitHub
          </Button>
        </div>

        <div className="mt-4">
          <Snippet hideCopyButton hideSymbol variant="flat">
            <span>
              Current version<Code className="ml-2" color="secondary">2024.6.20f</Code>
            </span>
          </Snippet>
        </div>
      </section>

      <section className="mt-2 flex flex-col items-center justify-center text-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h3 className={title()}>Unlock&nbsp;</h3>
          <h3 className={title({ color: "violet" })}>your&nbsp;</h3><br />
          <h3 className={title()}>creativity</h3>
          <h3 className={title()}>.</h3>
        </div>
        <p><Code color="secondary">SCREW: EDITOR</Code> available to all, gives you all the tools and resources<br />you need to learn, manage and grow your content.</p>

        <Image
          isBlurred
          width={600}
          src="https://screwltd.com/img/editor_screen.png"
          className="origin-center hover:rotate-6"
        />
      </section>

      <section className="mt-6 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "pink" })}>Make&nbsp;</h1>
          <h1 className={title()}>the&nbsp;</h1><br />
          <h1 className={title()}>most of&nbsp;</h1>
          <h1 className={title({ color: "pink" })}>power</h1>
          <h1 className={title()}>.</h1>
        </div>

        <p className="w-full text-lg lg:text-xl font-normal text-default-500 max-w-full md:w-full text-center flex justify-center items-center">Many benefits to use.</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-2">
          {features.map((feature, index) => (
            <Card key={index} className="p-5 flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
              <div className="text-base font-semibold">{feature.title}</div>
              <div className="font-normal text-base text-default-500">{feature.description}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8 mb-8 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Contact&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>us</h1>
          <h1 className={title()}>.</h1>
        </div>

        <p className="w-full text-lg lg:text-xl font-normal text-default-500 max-w-full md:w-full text-center flex justify-center items-center">If you have any questions or commercial offers,<br />you can contact us at any time.</p>

        <Button onClick={handleEmail} className={buttonStyles({
          color: "secondary",
          radius: "full",
          variant: "shadow",
          size: 'lg'
        })}>
          Get in touch
        </Button>
      </section>
    </>
  );
}
