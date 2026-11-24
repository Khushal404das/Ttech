import React from 'react';
import { Bot, Clapperboard, Cpu, HeartHandshake, Upload, Workflow } from 'lucide-react';
import type { Project } from '../data/projects';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  movieflix: Clapperboard,
  'social-autopilot': Workflow,
  'mcvt-system': Cpu,
  'ciro-ai': Bot,
  'nikkah-junction': HeartHandshake,
  'youtube-auto-uploader': Upload,
};

/** Screenshot when the project has one, otherwise a branded cover. */
export const ProjectVisual: React.FC<{ project: Project; className?: string; eager?: boolean }> = ({
  project,
  className = '',
  eager = false,
}) => {
  if (project.image) {
    const contain = project.image.fit === 'contain';
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: project.image.background || '#0B1220' }}
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-full w-full ${contain ? 'object-contain' : 'object-cover object-top'}`}
        />
      </div>
    );
  }
  const Icon = ICONS[project.slug] || Cpu;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent} ${className}`}
      role="img"
      aria-label={`${project.shortTitle} project cover`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <Icon className="h-7 w-7 text-white" />
        </span>
        <span className="font-display text-lg font-extrabold text-white">{project.shortTitle}</span>
      </div>
    </div>
  );
};
