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
    dogId: 1,
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
