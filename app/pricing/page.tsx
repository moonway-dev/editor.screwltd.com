"use client";
import { title } from "@/components/primitives";
import * as CardComponent from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/components/context/auth-context";

const pricingOptions = [
  {
    title: 'Personal',
    price: 'Free',
    features: [
      'No restrictions, all features available',
      'Can be used only for open-source development or local modifications',
    ],
    selected: true,
  },
  {
    title: 'Creator',
    price: '$99 + 30% comm.',
    features: [
      'Mandatory subscription if one or more modifications generate revenue',
      'Provides a slightly broader range of services (e.g., dedicated servers)',
    ],
    selected: false,
  },
  {
    title: 'Studio',
    price: '$499/mo + 20% comm.',
    features: [
      'Corporate subscription with up to 15 accounts',
      'Offers the same as the previous tier, but on a larger scale',
    ],
    selected: false,
  },
];

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <h1 className={title()}>Pricing</h1>
      <div className="mt-6 flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        {pricingOptions.map((option) => (
          <CardComponent.Card
            key={option.title}
            className="w-80 h-[28rem] p-6 flex flex-col justify-between border-transparent bg-white/5 dark:bg-default-400/10"
          >
            <CardComponent.CardHeader className="flex flex-col items-center">
              <h3 className="text-xl font-bold">{option.title}</h3>
              <p className="text-xl font-medium mt-2">{option.price}</p>
            </CardComponent.CardHeader>
            <CardComponent.CardBody className="flex-grow overflow-hidden h-auto">
              <ul className="space-y-2 text-left">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-purple-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardComponent.CardBody>
            <CardComponent.CardFooter className="flex justify-center mt-4">
              {user ? (
                <Button isDisabled={option.selected} color="secondary" className="w-full">
                  {option.selected ? 'Selected' : 'Select'}
                </Button>
              ) : (
                <Button isDisabled className="w-full">
                  Login first
                </Button>
              )}
            </CardComponent.CardFooter>
          </CardComponent.Card>
        ))}
      </div>
    </div>
  );
}
