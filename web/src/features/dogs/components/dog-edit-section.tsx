"use client";

import { useState } from "react";

type BooleanChoice = "가능" | "불가";
type Gender = "male" | "female";

type DogEditSectionProps = {
  dogId: number;
};

const traits = [
  "활발함",
  "얌전함",
  "애교많음",
  "독립적",
  "분리불안",
  "낯선사람친화",
  "산만기질음",
];

const mockDogs = {
  1: {
    name: "콩이",
    age: "3",
    gender: "male" as Gender,
    breed: "믹스견",
    regionSido: "서울",
    regionSigungu: "강남구",
    traits: ["활발함", "애교많음", "산만기질음"],
    walkAmount: "1시간",
    separationAnxiety: "있음" as "있음" | "없음",
    pottyTraining: "완료" as "완료" | "미완료",
    barking: "보통",
    apartment: "가능" as BooleanChoice,
    withChildren: "가능" as BooleanChoice,
    withDogs: "불가" as BooleanChoice,
    withCats: "불가" as BooleanChoice,
    description: "겁이 많지만 친해지면 애교쟁이에요.",
  },
  2: {
    name: "초코",
    age: "5",
    gender: "female" as Gender,
    breed: "푸들",
    regionSido: "서울",
    regionSigungu: "송파구",
    traits: ["얌전함", "독립적"],
    walkAmount: "30분 이하",
    separationAnxiety: "없음" as "있음" | "없음",
    pottyTraining: "완료" as "완료" | "미완료",
    barking: "적음",
    apartment: "가능" as BooleanChoice,
    withChildren: "가능" as BooleanChoice,
    withDogs: "가능" as BooleanChoice,
    withCats: "불가" as BooleanChoice,
    description: "조용하고 사람을 좋아해요.",
  },
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-foreground">{children}</label>;
}

function Pill({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active
          ? "border-primary bg-secondary text-primary"
          : "border-border bg-white text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function RadioLabel({
  label,
  checked = false,
  onClick,
}: {
  label: string;
  checked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1 text-sm">
      <span
        className={`flex size-4 items-center justify-center rounded-full border ${
          checked ? "border-primary" : "border-border"
        }`}
      >
        {checked ? <span className="size-2 rounded-full bg-primary" /> : null}
      </span>
      {label}
    </button>
  );
}

export function DogEditSection({ dogId }: DogEditSectionProps) {
  const dog = mockDogs[dogId as keyof typeof mockDogs] ?? mockDogs[1];

  const [name, setName] = useState(dog.name);
  const [age, setAge] = useState(dog.age);
  const [gender, setGender] = useState<Gender>(dog.gender);
  const [breed, setBreed] = useState(dog.breed);
  const [regionSido, setRegionSido] = useState(dog.regionSido);
  const [regionSigungu, setRegionSigungu] = useState(dog.regionSigungu);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(dog.traits);
  const [walkAmount, setWalkAmount] = useState(dog.walkAmount);
  const [separationAnxiety, setSeparationAnxiety] = useState(dog.separationAnxiety);
  const [pottyTraining, setPottyTraining] = useState(dog.pottyTraining);
  const [barking, setBarking] = useState(dog.barking);
  const [apartment, setApartment] = useState<BooleanChoice>(dog.apartment);
  const [withChildren, setWithChildren] = useState<BooleanChoice>(dog.withChildren);
  const [withDogs, setWithDogs] = useState<BooleanChoice>(dog.withDogs);
  const [withCats, setWithCats] = useState<BooleanChoice>(dog.withCats);
  const [description, setDescription] = useState(dog.description);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait)
        ? prev.filter((item) => item !== trait)
        : [...prev, trait]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      dogId,
      name,
      age,
      gender,
      breed,
      regionSido,
      regionSigungu,
      traits: selectedTraits,
      walkAmount,
      separationAnxiety,
      pottyTraining,
      barking,
      apartment,
      withChildren,
      withDogs,
      withCats,
      description,
    });

    alert("수정 데이터가 콘솔에 출력되었습니다.");
  };

  return (
    <form className="flex w-full max-w-[440px] flex-col gap-6" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold text-foreground">{name} 정보 수정</h1>

      <section className="flex flex-col gap-3">
        <FieldLabel>사진</FieldLabel>
        <div className="flex gap-2">
          <button type="button" className="flex size-[88px] items-center justify-center rounded-lg bg-muted">🖼️</button>
          <button type="button" className="flex size-[88px] items-center justify-center rounded-lg bg-muted">🖼️</button>
          <button type="button" className="flex size-[88px] items-center justify-center rounded-lg border border-border bg-muted text-lg">+</button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>이름</FieldLabel>
        <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary" />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>나이</FieldLabel>
        <input value={age} onChange={(e) => setAge(e.target.value)} className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary" />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>성별</FieldLabel>
        <div className="flex gap-4">
          <RadioLabel label="수컷" checked={gender === "male"} onClick={() => setGender("male")} />
          <RadioLabel label="암컷" checked={gender === "female"} onClick={() => setGender("female")} />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>품종</FieldLabel>
        <input value={breed} onChange={(e) => setBreed(e.target.value)} className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary" />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>지역</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <select value={regionSido} onChange={(e) => setRegionSido(e.target.value)} className="h-10 rounded-lg border border-border px-3 text-sm">
            <option>서울</option>
            <option>경기</option>
            <option>인천</option>
          </select>
          <select value={regionSigungu} onChange={(e) => setRegionSigungu(e.target.value)} className="h-10 rounded-lg border border-border px-3 text-sm">
            <option>강남구</option>
            <option>송파구</option>
            <option>마포구</option>
          </select>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>성격 태그</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <Pill key={trait} active={selectedTraits.includes(trait)} onClick={() => toggleTrait(trait)}>
              {trait}
            </Pill>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>생활 패턴</FieldLabel>

        <div>
          <p className="mb-2 text-xs">산책량</p>
          <div className="flex gap-2">
            {["30분 이하", "1시간", "2시간+"].map((item) => (
              <Pill key={item} active={walkAmount === item} onClick={() => setWalkAmount(item)}>
                {item}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs">분리불안</p>
          <div className="flex gap-4">
            <RadioLabel label="있음" checked={separationAnxiety === "있음"} onClick={() => setSeparationAnxiety("있음")} />
            <RadioLabel label="없음" checked={separationAnxiety === "없음"} onClick={() => setSeparationAnxiety("없음")} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs">배변훈련</p>
          <div className="flex gap-4">
            <RadioLabel label="완료" checked={pottyTraining === "완료"} onClick={() => setPottyTraining("완료")} />
            <RadioLabel label="미완료" checked={pottyTraining === "미완료"} onClick={() => setPottyTraining("미완료")} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs">짖음</p>
          <div className="flex gap-2">
            {["적음", "보통", "많음"].map((item) => (
              <Pill key={item} active={barking === item} onClick={() => setBarking(item)}>
                {item}
              </Pill>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>환경</FieldLabel>

        {[
          ["아파트 가능", apartment, setApartment],
          ["아이와 생활", withChildren, setWithChildren],
          ["다른 개", withDogs, setWithDogs],
          ["고양이", withCats, setWithCats],
        ].map(([label, value, setter]) => (
          <div key={label as string} className="flex items-center justify-between">
            <span className="text-sm">{label as string}</span>
            <div className="flex gap-2">
              <Pill active={value === "가능"} onClick={() => (setter as React.Dispatch<React.SetStateAction<BooleanChoice>>)("가능")}>가능</Pill>
              <Pill active={value === "불가"} onClick={() => (setter as React.Dispatch<React.SetStateAction<BooleanChoice>>)("불가")}>불가</Pill>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>한마디</FieldLabel>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-20 resize-none rounded-lg border border-border p-3 text-sm outline-none focus:border-primary" />
      </section>

      <div className="flex items-center justify-between pt-2">
        <button type="button" className="rounded-full border border-border px-5 py-2 text-sm">
          취소
        </button>
        <button type="submit" className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
          수정 완료
        </button>
      </div>
    </form>
  );
}