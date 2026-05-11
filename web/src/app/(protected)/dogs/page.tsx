import { ApplicantListSection } from "@/features/adoptions/components/applicant-list-section";
import { MyDogListSection } from "@/features/dogs/components/my-dog-list-section";
import { Divider } from "@/shared/ui";

export default function DogsPage() {
  return (
    <section className="flex w-full max-w-[900px] flex-col gap-xl">
      <MyDogListSection />
      <Divider />
      <ApplicantListSection />
    </section>
  );
}
