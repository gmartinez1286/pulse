"use client";

import { Switch } from "@/components/ui/switch";

export function SwitchRow({
  title,
  description,
  defaultChecked = true,
}: {
  title: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2.5 text-[13px] last:border-0">
      <div>
        <b className="block font-semibold">{title}</b>
        {description && (
          <small className="text-muted">{description}</small>
        )}
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
