import { Text } from "@/shared/ui";

type DogFosterNoteProps = {
  fosterNote?: string | null;
};

export function DogFosterNote({ fosterNote }: DogFosterNoteProps) {
  if (!fosterNote?.trim()) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-[10px] rounded-lg bg-card p-md">
      <Text size="md" weight="semibold">
        임시 보호자의 한마디
      </Text>
      <Text color="muted" className="break-keep leading-relaxed">
        &quot;{fosterNote}&quot;
      </Text>
    </section>
  );
}
