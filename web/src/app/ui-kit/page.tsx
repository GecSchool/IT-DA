"use client";

import {
  Check,
  Dog,
  Heart,
  Home,
  ImagePlus,
  MessageCircle,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Chip,
  Dialog,
  Divider,
  EmptyState,
  Heading,
  IconButton,
  Input,
  PhotoTile,
  ProgressBar,
  RadioGroup,
  Select,
  Spinner,
  Switch,
  Tabs,
  Text,
  Textarea,
} from "@/shared/ui";

const tabItems = [
  { value: "pending", label: "검토 중 2" },
  { value: "accepted", label: "수락 1" },
  { value: "rejected", label: "거절 0" },
];

export default function UiKitPage() {
  const [selectedTab, setSelectedTab] = useState("accepted");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState(["활발함", "산책 좋아함"]);

  const toggleChip = (value: string) => {
    setSelectedChips((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  return (
    <main className="min-h-screen bg-muted px-xl py-2xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-xl">
        <header className="flex flex-col gap-xs">
          <Text size="sm" weight="semibold" color="muted" className="uppercase">
            UI Kit
          </Text>
          <Heading as="h1" size="xl">
            Shared UI Components
          </Heading>
          <Text color="muted">
            `docs/pencil-new.pen`의 Design System / Atoms 기준으로 만든 공통 UI입니다.
          </Text>
        </header>

        <Section title="Typography">
          <div className="grid gap-lg md:grid-cols-2">
            <div className="rounded-m bg-card p-lg shadow-sm">
              <Heading as="h2" size="lg">
                유기동물 임시보호 기반 입양 매칭
              </Heading>
              <Text className="mt-sm" color="muted">
                임보자가 직접 키워보며 파악한 정보를 바탕으로 책임감 있는 입양 연결을 돕습니다.
              </Text>
            </div>
            <div className="grid gap-sm rounded-m bg-card p-lg shadow-sm">
              <Text size="xs" color="muted">
                xs · 11
              </Text>
              <Text size="sm" color="muted">
                sm · 12
              </Text>
              <Text size="md">md · 14</Text>
              <Text size="base" weight="medium">
                base · 16
              </Text>
              <Text size="lg" weight="semibold">
                lg · 18
              </Text>
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-md">
            <Button>버튼</Button>
            <Button variant="secondary">버튼</Button>
            <Button variant="outline">버튼</Button>
            <Button variant="ghost">버튼</Button>
            <Button variant="danger">삭제</Button>
            <Button leftIcon={<Plus className="size-4" />}>공고 등록</Button>
            <IconButton aria-label="좋아요" variant="outline">
              <Heart className="size-5" />
            </IconButton>
            <IconButton aria-label="더보기">
              <MoreHorizontal className="size-5" />
            </IconButton>
          </div>
          <div className="mt-md">
            <Button fullWidth size="lg" leftIcon={<Dog className="size-5" />}>
              임시보호 강아지 등록
            </Button>
          </div>
        </Section>

        <Section title="Inputs & Forms">
          <div className="grid gap-lg md:grid-cols-3">
            <Input label="닉네임" placeholder="입력하세요" />
            <Input label="지역" placeholder="서울 마포구" error="올바르지 않은 값이에요" />
            <Select
              label="거주 형태"
              placeholder="선택하세요"
              options={[
                { value: "apartment", label: "아파트" },
                { value: "house", label: "단독주택" },
                { value: "officetel", label: "오피스텔" },
              ]}
            />
            <Textarea
              label="임보자 한마디"
              placeholder="강아지의 성격과 생활 모습을 적어주세요"
              className="md:col-span-2"
            />
            <Input label="비활성 입력" placeholder="사용 불가" disabled />
          </div>
        </Section>

        <Section title="Chips & Badges">
          <div className="flex flex-wrap gap-sm">
            {["활발함", "산책 좋아함", "얌전함", "아이와 가능", "고양이 가능"].map((chip) => (
              <Chip
                key={chip}
                selected={selectedChips.includes(chip)}
                onClick={() => toggleChip(chip)}
              >
                {chip}
              </Chip>
            ))}
          </div>
          <div className="mt-lg flex flex-wrap gap-sm">
            <Badge>매칭 중</Badge>
            <Badge variant="adopted">입양 완료</Badge>
            <Badge variant="high" size="md">
              나와 87% 맞아요
            </Badge>
            <Badge variant="mid" size="md">
              나와 65% 맞아요
            </Badge>
            <Badge variant="pending">검토 중</Badge>
            <Badge variant="danger">거절됨</Badge>
          </div>
        </Section>

        <Section title="Tabs, Media & Feedback">
          <div className="grid gap-lg lg:grid-cols-[1fr_360px]">
            <div className="rounded-m bg-card p-lg shadow-sm">
              <Tabs items={tabItems} value={selectedTab} onValueChange={setSelectedTab} />
              <div className="mt-lg">
                <ProgressBar value={66} />
              </div>
              <Divider className="my-lg" />
              <RadioGroup
                label="활동량"
                defaultValue="medium"
                options={[
                  { value: "low", label: "낮음" },
                  { value: "medium", label: "보통" },
                  { value: "high", label: "높음" },
                ]}
              />
              <div className="mt-lg">
                <Switch id="apartment" label="아파트 가능" description="실내 생활이 가능한 강아지예요." />
              </div>
              <div className="mt-lg flex items-center gap-md rounded-m border border-border p-md">
                <Avatar kind="dog" />
                <div className="min-w-0 flex-1">
                  <Text weight="semibold">초코</Text>
                  <Text size="sm" color="muted">
                    현재 탭: {tabItems.find((item) => item.value === selectedTab)?.label}
                  </Text>
                </div>
                <Spinner size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-md">
              <PhotoTile />
              <PhotoTile aspect="square" />
              <PhotoTile
                aspect="square"
                overlay={
                  <div className="flex size-full items-center justify-center bg-overlay text-primary-foreground">
                    <ImagePlus className="size-6" />
                  </div>
                }
              />
              <EmptyState
                className="min-h-0"
                title="게시물 없음"
                description="아직 등록된 게시물이 없어요."
                icon={<MessageCircle className="size-6" />}
              />
            </div>
          </div>
        </Section>

        <Section title="Dialog">
          <div className="flex flex-wrap items-center gap-md">
            <Button onClick={() => setDialogOpen(true)}>입양 신청 모달 열기</Button>
            <div className="flex items-center gap-sm rounded-m bg-card px-md py-sm shadow-sm">
              <Avatar kind="user" size="sm" />
              <Text size="sm" weight="medium">
                임보자 프로필
              </Text>
            </div>
            <div className="flex items-center gap-sm rounded-m bg-card px-md py-sm shadow-sm">
              <Home className="size-4 text-primary" />
              <Text size="sm" color="muted">
                서울 마포구
              </Text>
            </div>
          </div>
        </Section>
      </div>

      <Dialog
        open={dialogOpen}
        title="입양 신청"
        description="신청 전 보호 환경과 연락 가능 여부를 한 번 더 확인해주세요."
        onClose={() => setDialogOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              취소
            </Button>
            <Button leftIcon={<Check className="size-4" />} onClick={() => setDialogOpen(false)}>
              신청하기
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-md rounded-m border border-border p-md">
          <Avatar kind="dog" size="lg" />
          <div>
            <Text weight="semibold">초코</Text>
            <Text size="sm" color="muted">
              8kg · 중형 · 서울 마포구
            </Text>
          </div>
        </div>
      </Dialog>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg bg-background p-lg shadow-sm">
      <div className="mb-md flex items-center justify-between gap-md">
        <Heading as="h2" size="md">
          {title}
        </Heading>
      </div>
      {children}
    </section>
  );
}
