import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { CAL_URL } from "@/data/site";

interface CtaBannerProps {
  heading?: string;
  text?: string;
  buttonLabel?: string;
}

export function CtaBanner({
  heading = "Ready to Redefine Your Business Potential?",
  text = "Discover how AI automation can elevate your organization. Schedule a free consultation today and take the first step towards a more intelligent, efficient future.",
  buttonLabel = "Schedule a Free Consultation",
}: CtaBannerProps) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-1/2 top-0 h-56 w-[24rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[80px] sm:h-80 sm:w-[40rem] sm:blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-background sm:text-4xl">
                {heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-background/70 sm:text-lg">
                {text}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href={CAL_URL} external size="lg">
                  {buttonLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
