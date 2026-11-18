// Ajansın statik demo verileri. Proje dağılımı tüm yılları kapsar.
export const completedProjects = [
  { label: '2022', value: 18 },
  { label: '2023', value: 22 },
  { label: '2024', value: 25 },
  { label: '2025', value: 29 },
  { label: '2026', value: 30 }
];
export const serviceBreakdown = [
  { label: 'Web Tasarım ve Geliştirme', value: 54, color: 'var(--bs-primary)' },
  { label: 'Mobil Uygulama Geliştirme', value: 32, color: '#0f766e' },
  { label: 'Kurumsal Yazılım Çözümleri', value: 38, color: '#9a3412' }
];
export const satisfaction = [
  { label: '2025 · 4. çeyrek', axisLabel: '2025 Ç4', value: 93 },
  { label: '2026 · 1. çeyrek', axisLabel: '2026 Ç1', value: 95 },
  { label: '2026 · 2. çeyrek', axisLabel: '2026 Ç2', value: 97 },
  { label: '2026 · 3. çeyrek', axisLabel: '2026 Ç3', value: 99 }
];

export const totalProjects = serviceBreakdown.reduce((total, item) => total + item.value, 0);
export const averageSatisfaction = satisfaction.reduce((total, item) => total + item.value, 0) / satisfaction.length;
export const metrics = {
  projects: totalProjects,
  clients: 68,
  experience: 8,
  satisfaction: `%${averageSatisfaction}`
};
