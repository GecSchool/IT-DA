import type { DogDetail } from "@/features/dogs/types/dog";
import { Text } from "@/shared/ui";

type DogFosterNoteProps = {
  dog: DogDetail;
};

export function DogFosterNote({ dog }: DogFosterNoteProps) {
  if (!dog.fosterNote.trim()) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-[10px] rounded-lg bg-card p-md">
      <Text size="md" weight="semibold">
        임시 보호자의 한마디
      </Text>
      <Text color="muted" className="break-keep leading-relaxed">
        &quot;{dog.fosterNote}&quot;
      </Text>
    </section>
  );
}
