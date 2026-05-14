"use client";

const traits = [
  "활발함",
  "얌전함",
  "애교많음",
  "독립적",
  "분리불안",
  "낯선사람친화",
  "산만기질음",
];

const selectedTraits = ["활발함", "애교많음", "산만기질음"];

function Pill({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-full border px-3 py-1 text-xs ${
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
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="flex items-center gap-1 text-sm text-foreground">
      <span
        className={`flex size-4 items-center justify-center rounded-full border ${
          checked ? "border-primary" : "border-border"
        }`}
      >
        {checked ? <span className="size-2 rounded-full bg-primary" /> : null}
      </span>
      {label}
    </label>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-foreground">{children}</label>;
}

export function DogEditSection() {
  return (
    <form className="flex w-full max-w-[440px] flex-col gap-6">
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
          defaultValue="콩이"
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>나이</FieldLabel>
        <input
          defaultValue="3"
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>성별</FieldLabel>
        <div className="flex gap-4">
          <RadioLabel label="수컷" checked />
          <RadioLabel label="암컷" />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>품종</FieldLabel>
        <input
          defaultValue="믹스견"
          className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
        />
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>지역</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <select
            defaultValue="서울"
            className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
          >
            <option>서울</option>
          </select>
          <select
            defaultValue="강남구"
            className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
          >
            <option>강남구</option>
          </select>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>성격 태그</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <Pill key={trait} active={selectedTraits.includes(trait)}>
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
              <Pill>30분 이하</Pill>
              <Pill active>1시간</Pill>
              <Pill>2시간+</Pill>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">분리불안</p>
            <div className="flex gap-4">
              <RadioLabel label="있음" checked />
              <RadioLabel label="없음" />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">배변훈련</p>
            <div className="flex gap-4">
              <RadioLabel label="완료" checked />
              <RadioLabel label="미완료" />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">짖음</p>
            <div className="flex gap-2">
              <Pill>적음</Pill>
              <Pill active>보통</Pill>
              <Pill>많음</Pill>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel>환경</FieldLabel>

        {[
          ["아파트 가능", "가능"],
          ["아이와 생활", "가능"],
          ["다른 개", "불가"],
          ["고양이", "불가"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{label}</span>
            <div className="flex gap-2">
              <Pill active={value === "가능"}>가능</Pill>
              <Pill active={value === "불가"}>불가</Pill>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <FieldLabel>한마디</FieldLabel>
        <textarea
          defaultValue="겁이 많지만 친해지면 애교쟁이에요."
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
