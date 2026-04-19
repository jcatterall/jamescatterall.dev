import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Github, Mail, ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with Next.js and TypeScript. Handles real-time data and complex state management.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Project Two",
    description:
      "Open-source CLI tool for automating repetitive development tasks. 500+ stars on GitHub.",
    tags: ["Node.js", "CLI", "Open Source"],
    href: "#",
  },
  {
    title: "Project Three",
    description:
      "Mobile-first e-commerce storefront with custom CMS integration and a perfect Lighthouse score.",
    tags: ["React", "Tailwind", "Shopify"],
    href: "#",
  },
];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
];

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">

      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold">James Catterall</h1>
          <p className="text-xl font-base text-foreground/80">
            Software Developer
          </p>
        </div>
        <p className="font-base leading-relaxed max-w-xl">
          I build thoughtful, well-crafted software. Focused on clean
          architecture, great developer experience, and products that are
          genuinely useful.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button asChild>
            <a
              href="https://github.com/jcatterall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold">Work</h2>
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>{project.title}</CardTitle>
                  <a
                    href={project.href}
                    className="text-foreground hover:text-foreground/70 transition-colors flex-shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="neutral">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border pt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="font-base text-sm">© 2026 James Catterall</p>
        <div className="flex gap-4">
          <a
            href="mailto:james.catterall92@gmail.com"
            className="font-base text-sm font-bold hover:text-foreground/70 transition-colors flex items-center gap-1"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-base text-sm font-bold hover:text-foreground/70 transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </footer>

    </main>
  );
}
