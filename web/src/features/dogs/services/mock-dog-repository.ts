import type { DogRepository } from "./dog-repository";
import type { DogDetail, DogSize } from "../types/dog";
import type { DogFormPayload } from "../types/dog-payload";

const calculateDogSize = (weight: number): DogSize => {
  if (weight < 7) {
    return "SMALL";
  }

  if (weight < 15) {
    return "MEDIUM";
  }

  return "LARGE";
};

let nextDogId = 3;

let mockDogs: DogDetail[] = [
  {
    dogId: 7,
    isMine: false,
    viewerAdoption: {
      adoptionId: 7,
      status: "COMPLETE",
    },
    name: "구름",
    gender: "MALE",
    breed: "비숑",
    regionSido: "경기도",
    regionSigungu: "수원시",
    weight: 6.2,
    size: "SMALL",
    traits: ["PLAYFUL", "AFFECTIONATE"],
    walkAmount: "1H",
    isToiletTrained: true,
    barkingLevel: "LOW",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: false,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "밝고 사람을 좋아해서 함께 시간을 보내는 걸 좋아해요.",
    imageUrls: ["/mock/dogs/gureum-1.jpg"],
    status: "ADOPTED",
    applicationCount: 4,
  },
  {
    dogId: 6,
    isMine: false,
    viewerAdoption: {
      adoptionId: 6,
      status: "REJECTED",
    },
    name: "모카",
    gender: "FEMALE",
    breed: "코카스파니엘",
    regionSido: "부산광역시",
    regionSigungu: "해운대구",
    weight: 9.3,
    size: "MEDIUM",
    traits: ["CALM", "INDEPENDENT"],
    walkAmount: "1H",
    isToiletTrained: true,
    barkingLevel: "MEDIUM",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: false,
    canLiveWithDog: true,
    canLiveWithCat: false,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "차분한 편이고 익숙한 사람에게 천천히 마음을 여는 아이예요.",
    imageUrls: ["/mock/dogs/moca-1.jpg"],
    status: "AVAILABLE",
    applicationCount: 2,
  },
  {
    dogId: 5,
    isMine: false,
    viewerAdoption: {
      adoptionId: 5,
      status: "ACCEPTED",
    },
    name: "밤비",
    gender: "FEMALE",
    breed: "포메라니안",
    regionSido: "대구광역시",
    regionSigungu: "수성구",
    weight: 3.9,
    size: "SMALL",
    traits: ["AFFECTIONATE", "TIMID"],
    walkAmount: "UNDER_30M",
    isToiletTrained: true,
    barkingLevel: "LOW",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: false,
    canLiveWithDog: false,
    canLiveWithCat: true,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "낯을 조금 가리지만 품에 안기면 편안해하는 작은 아이예요.",
    imageUrls: ["/mock/dogs/bambi-1.jpg", "/mock/dogs/bambi-2.jpg"],
    status: "AVAILABLE",
    applicationCount: 3,
  },
  {
    dogId: 4,
    isMine: false,
    viewerAdoption: {
      adoptionId: 4,
      status: "PENDING",
    },
    name: "라떼",
    gender: "FEMALE",
    breed: "말티즈",
    regionSido: "서울특별시",
    regionSigungu: "강동구",
    weight: 4.8,
    size: "SMALL",
    traits: ["AFFECTIONATE", "CALM"],
    walkAmount: "UNDER_30M",
    isToiletTrained: true,
    barkingLevel: "LOW",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: true,
    canLiveWithDog: false,
    canLiveWithCat: true,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "사람 곁에 조용히 붙어있는 걸 좋아하는 다정한 아이예요.",
    imageUrls: ["/mock/dogs/latte-1.jpg", "/mock/dogs/latte-2.jpg"],
    status: "AVAILABLE",
    applicationCount: 1,
  },
  {
    dogId: 3,
    isMine: false,
    viewerAdoption: null,
    name: "보리",
    gender: "MALE",
    breed: "시바 믹스",
    regionSido: "인천광역시",
    regionSigungu: "연수구",
    weight: 11.6,
    size: "MEDIUM",
    traits: ["INDEPENDENT", "PLAYFUL"],
    walkAmount: "OVER_2H",
    isToiletTrained: true,
    barkingLevel: "MEDIUM",
    isSeparationAnxiety: false,
    canLiveInApartment: false,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: false,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "처음에는 조심스럽지만 산책을 나가면 표정이 밝아지는 아이예요.",
    imageUrls: ["/mock/dogs/bori-1.jpg", "/mock/dogs/bori-2.jpg", "/mock/dogs/bori-3.jpg"],
    status: "AVAILABLE",
    applicationCount: 0,
  },
  {
    dogId: 1,
    isMine: true,
    viewerAdoption: null,
    name: "초코",
    gender: "FEMALE",
    breed: "믹스",
    regionSido: "서울특별시",
    regionSigungu: "마포구",
    weight: 8.2,
    size: "MEDIUM",
    traits: ["ACTIVE", "AFFECTIONATE"],
    walkAmount: "1H",
    isToiletTrained: true,
    barkingLevel: "LOW",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: false,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "사람을 좋아하고 산책을 즐기는 밝은 아이예요.",
    imageUrls: ["/mock/dogs/choco-1.jpg", "/mock/dogs/choco-2.jpg"],
    status: "AVAILABLE",
    applicationCount: 3,
  },
  {
    dogId: 2,
    isMine: true,
    viewerAdoption: null,
    name: "두부",
    gender: "MALE",
    breed: "푸들",
    regionSido: "경기도",
    regionSigungu: "성남시",
    weight: 5.4,
    size: "SMALL",
    traits: ["CALM", "AFFECTIONATE"],
    walkAmount: "UNDER_30M",
    isToiletTrained: true,
    barkingLevel: "MEDIUM",
    isSeparationAnxiety: false,
    canLiveInApartment: true,
    canLiveWithChild: false,
    canLiveWithDog: true,
    canLiveWithCat: true,
    isNeutered: true,
    isVaccinated: true,
    hasDisease: false,
    diseaseDescription: null,
    fosterNote: "조용한 환경에서 안정감을 느끼는 아이예요.",
    imageUrls: ["/mock/dogs/dubu-1.jpg"],
    status: "AVAILABLE",
    applicationCount: 1,
  },
];

const findDog = (dogId: number) => {
  const dog = mockDogs.find((item) => item.dogId === dogId);

  if (!dog) {
    throw new Error("Dog not found");
  }

  return dog;
};

export function createMockDogRepository(): DogRepository {
  return {
    async createDog(payload) {
      const dog: DogDetail = {
        ...payload,
        dogId: nextDogId,
        isMine: true,
        viewerAdoption: null,
        size: calculateDogSize(payload.weight),
        status: "AVAILABLE",
        applicationCount: 0,
      };

      mockDogs = [dog, ...mockDogs];
      nextDogId += 1;

      return { dogId: dog.dogId };
    },

    async getMyDogs() {
      return mockDogs.map((dog) => ({
        dogId: dog.dogId,
        name: dog.name,
        thumbnailUrl: dog.imageUrls[0] ?? "",
        status: dog.status,
        applicationCount: dog.applicationCount,
      }));
    },

    async getRecentDogs(limit = 10) {
      return mockDogs.slice(0, limit).map((dog) => ({
        dogId: dog.dogId,
        name: dog.name,
        thumbnailUrl: dog.imageUrls[0] ?? "",
      }));
    },

    async getDogDetail(dogId) {
      return findDog(dogId);
    },

    async updateDog(dogId, payload: DogFormPayload) {
      mockDogs = mockDogs.map((dog) =>
        dog.dogId === dogId
          ? {
              ...dog,
              ...payload,
              size: calculateDogSize(payload.weight),
            }
          : dog
      );
    },

    async deleteDog(dogId) {
      mockDogs = mockDogs.filter((dog) => dog.dogId !== dogId);
    },

    async completeDog(dogId) {
      mockDogs = mockDogs.map((dog) =>
        dog.dogId === dogId
          ? {
              ...dog,
              status: "ADOPTED",
            }
          : dog
      );
    },
  };
}
