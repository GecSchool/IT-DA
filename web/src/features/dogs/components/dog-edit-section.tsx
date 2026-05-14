"use client";

import { useState } from "react";

const traits = [
  "활발함",
  "얌전함",
  "애교많음",
  "독립적",
  "분리불안",
  "낯선사람친화",
  "산만기질음",
];

type BooleanChoice = "가능" | "불가";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold text-foreground">
      {children}
    </label>
  );
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
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-foreground"
    >
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

export function DogEditSection() {
  const [name, setName] = useState("콩이");
  const [age, setAge] = useState("3");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [breed, setBreed] = useState("믹스견");
  const [regionSido, setRegionSido] = useState("서울");
  const [regionSigungu, setRegionSigungu] = useState("강남구");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([
    "활발함",
    "애교많음",
    "산만기질음",
  ]);

  const [walkAmount, setWalkAmount] = useState("1시간");
  const [separationAnxiety, setSeparationAnxiety] = useState<"있음" | "없음">(
    "있음"
  );
  const [pottyTraining, setPottyTraining] = useState<"완료" | "미완료">("완료");
  const [barking, setBarking] = useState("보통");

  const [apartment, setApartment] = useState<BooleanChoice>("가능");
  const [withChildren, setWithChildren] = useState<BooleanChoice>("가능");
  const [withDogs, setWithDogs] = useState<BooleanChoice>("불가");
  const [withCats, setWithCats] = useState<BooleanChoice>("불가");

  const [description, setDescription] = useState(
    "겁이 많지만 친해지면 애교쟁이에요."
  );

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait)
        ? prev.filter((item) => item !== trait)
        : [...prev, trait]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editDogPayload = {
      name,
      age,
      gender,
      breed,
      regionSido,
      regionSigungu,
      traits: selectedTraits,
      lifestyle: {
        walkAmount,
        separationAnxiety,
        pottyTraining,
        barking,
      },
      environment: {
        apartment,
        withChildren,
        withDogs,
        withCats,
      },
      description,
    };

    console.log("Dog edit payload:", editDogPayload);
    alert("수정 데이터가 콘솔에 출력되었습니다.");
  };

  return (
    <form
      className="flex w-full max-w-[440px] flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold text-foreground">콩이 정보 수정</h1>

      <section className="flex flex-col gap-3">
        <FieldLabel>사진</FieldLabel>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex size-[88px] items-center justify-center rounded-lg bg-muted text-muted-foreground"
          >
            🖼️
          </button>

          <button
            type="button"
            className="flex size-[88px] items-center justify-center rounded-lg bg-muted text-muted-foreground"
          >
            🖼️
          </button>

          <button
            type="button"
            className="flex size-[88px] items-center justify-center rounded-lg border border-border bg-muted text-lg text-muted-foreground"
          >
            +
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>이름</FieldLabel>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>나이</FieldLabel>
        <input
          value={age}
          onChange={(event) => setAge(event.target.value)}
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>성별</FieldLabel>

        <div className="flex gap-4">
          <RadioLabel
            label="수컷"
            checked={gender === "male"}
            onClick={() => setGender("male")}
          />
          <RadioLabel
            label="암컷"
            checked={gender === "female"}
            onClick={() => setGender("female")}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>품종</FieldLabel>
        <input
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>지역</FieldLabel>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={regionSido}
            onChange={(event) => setRegionSido(event.target.value)}
            className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
          >
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
          </select>

          <select
            value={regionSigungu}
            onChange={(event) => setRegionSigungu(event.target.value)}
            className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
          >
            <option value="강남구">강남구</option>
            <option value="송파구">송파구</option>
            <option value="마포구">마포구</option>
          </select>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>성격 태그</FieldLabel>

        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <Pill
              key={trait}
              active={selectedTraits.includes(trait)}
              onClick={() => toggleTrait(trait)}
            >
              {trait}
            </Pill>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>생활 패턴</FieldLabel>

        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-xs text-foreground">산책량</p>
            <div className="flex gap-2">
              {["30분 이하", "1시간", "2시간+"].map((item) => (
                <Pill
                  key={item}
                  active={walkAmount === item}
                  onClick={() => setWalkAmount(item)}
                >
                  {item}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">분리불안</p>
            <div className="flex gap-4">
              <RadioLabel
                label="있음"
                checked={separationAnxiety === "있음"}
                onClick={() => setSeparationAnxiety("있음")}
              />
              <RadioLabel
                label="없음"
                checked={separationAnxiety === "없음"}
                onClick={() => setSeparationAnxiety("없음")}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">배변훈련</p>
            <div className="flex gap-4">
              <RadioLabel
                label="완료"
                checked={pottyTraining === "완료"}
                onClick={() => setPottyTraining("완료")}
              />
              <RadioLabel
                label="미완료"
                checked={pottyTraining === "미완료"}
                onClick={() => setPottyTraining("미완료")}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">짖음</p>
            <div className="flex gap-2">
              {["적음", "보통", "많음"].map((item) => (
                <Pill
                  key={item}
                  active={barking === item}
                  onClick={() => setBarking(item)}
                >
                  {item}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>환경</FieldLabel>

        {[
          {
            label: "아파트 가능",
            value: apartment,
            setter: setApartment,
          },
          {
            label: "아이와 생활",
            value: withChildren,
            setter: setWithChildren,
          },
          {
            label: "다른 개",
            value: withDogs,
            setter: setWithDogs,
          },
          {
            label: "고양이",
            value: withCats,
            setter: setWithCats,
          },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{label}</span>

            <div className="flex gap-2">
              <Pill active={value === "가능"} onClick={() => setter("가능")}>
                가능
              </Pill>
              <Pill active={value === "불가"} onClick={() => setter("불가")}>
                불가
              </Pill>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>한마디</FieldLabel>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="h-20 resize-none rounded-lg border border-border p-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          className="rounded-full border border-border px-5 py-2 text-sm text-foreground"
        >
          취소
        </button>

        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
        >
          수정 완료
        </button>
      </div>
    </form>
  );
}