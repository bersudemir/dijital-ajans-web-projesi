import { LocalStorageAdapter } from './local-storage-adapter.js';
import { serviceSeed, announcementSeed } from './seed-data.js';
import { ServiceRepository } from '../repositories/service-repository.js';
import { AnnouncementRepository } from '../repositories/announcement-repository.js';
import { ServiceService } from '../services/service-service.js';
import { AnnouncementService } from '../services/announcement-service.js';

const storage = new LocalStorageAdapter();
const serviceRepository = new ServiceRepository(storage);
const announcementRepository = new AnnouncementRepository(storage);

serviceRepository.seed(serviceSeed);
announcementRepository.seed(announcementSeed);

export const app = Object.freeze({
  services: new ServiceService(serviceRepository),
  announcements: new AnnouncementService(announcementRepository),
  repositories: Object.freeze({
    services: serviceRepository,
    announcements: announcementRepository
  })
});
