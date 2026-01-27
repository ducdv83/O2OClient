import { CarePro, Review } from '../types/carepro.types';

export const mockCarePros: CarePro[] = [
  {
    id: '1',
    name: 'Nguyễn Thị Lan',
    avatar: '👩‍⚕️',
    phone: '0901234567',
    bio: 'Điều dưỡng viên với 5 năm kinh nghiệm chăm sóc bệnh nhân tại nhà và bệnh viện. Chuyên về chăm sóc sau mổ và vật lý trị liệu.',
    yearsExp: 5,
    skills: ['Tiêm thuốc', 'Sơ cứu', 'Chăm sóc sau mổ', 'Đo huyết áp'],
    certificates: ['Chứng chỉ điều dưỡng', 'Chứng chỉ sơ cứu'],
    verifiedLevel: 2,
    ratingAvg: 4.9,
    ratingCount: 120,
    hourlyRateHint: 120000,
    serviceTypes: ['patient', 'elderly'],
    location: {
      latitude: 10.7769,
      longitude: 106.7009,
      address: 'Quận 1, TP.HCM',
    },
    availableHours: {
      'monday': [{ start: '08:00', end: '17:00' }],
      'tuesday': [{ start: '08:00', end: '17:00' }],
      'wednesday': [{ start: '08:00', end: '17:00' }],
    },
  },
  {
    id: '2',
    name: 'Trần Văn Minh',
    avatar: '👨‍⚕️',
    phone: '0902345678',
    bio: 'Hộ lý chuyên nghiệp với 8 năm kinh nghiệm chăm sóc người già. Tận tâm, chu đáo và có kỹ năng giao tiếp tốt.',
    yearsExp: 8,
    skills: ['Chăm sóc người già', 'Vật lý trị liệu', 'Hỗ trợ ăn uống', 'Vệ sinh cá nhân'],
    certificates: ['Chứng chỉ hộ lý', 'Chứng chỉ vật lý trị liệu'],
    verifiedLevel: 2,
    ratingAvg: 4.8,
    ratingCount: 89,
    hourlyRateHint: 110000,
    serviceTypes: ['elderly'],
    location: {
      latitude: 10.7900,
      longitude: 106.7000,
      address: 'Quận 3, TP.HCM',
    },
  },
  {
    id: '3',
    name: 'Lê Thị Hoa',
    avatar: '👩',
    phone: '0903456789',
    bio: 'Bảo mẫu chuyên nghiệp với 6 năm kinh nghiệm chăm sóc trẻ sơ sinh và trẻ nhỏ. Yêu trẻ, có kinh nghiệm chăm sóc thai sản.',
    yearsExp: 6,
    skills: ['Chăm sóc trẻ sơ sinh', 'Chăm thai sản', 'Cho trẻ ăn', 'Tắm cho trẻ'],
    certificates: ['Chứng chỉ bảo mẫu', 'Chứng chỉ chăm sóc trẻ sơ sinh'],
    verifiedLevel: 2,
    ratingAvg: 5.0,
    ratingCount: 156,
    hourlyRateHint: 130000,
    serviceTypes: ['baby', 'maternity'],
    location: {
      latitude: 10.7600,
      longitude: 106.6800,
      address: 'Quận 2, TP.HCM',
    },
  },
  {
    id: '4',
    name: 'Phạm Văn Đức',
    avatar: '👨',
    phone: '0904567890',
    bio: 'Điều dưỡng viên với 4 năm kinh nghiệm, chuyên về chăm sóc bệnh nhân nội trú và ngoại trú.',
    yearsExp: 4,
    skills: ['Tiêm thuốc', 'Sơ cứu', 'Quản lý thuốc', 'Đo huyết áp'],
    certificates: ['Chứng chỉ điều dưỡng'],
    verifiedLevel: 1,
    ratingAvg: 4.7,
    ratingCount: 67,
    hourlyRateHint: 105000,
    serviceTypes: ['patient'],
    location: {
      latitude: 10.8000,
      longitude: 106.7200,
      address: 'Quận 5, TP.HCM',
    },
  },
  {
    id: '5',
    name: 'Hoàng Thị Mai',
    avatar: '👩‍⚕️',
    phone: '0905678901',
    bio: 'Y tá với 7 năm kinh nghiệm, chuyên về chăm sóc người già và bệnh nhân cần chăm sóc đặc biệt.',
    yearsExp: 7,
    skills: ['Chăm sóc người già', 'Vật lý trị liệu', 'Quản lý thuốc', 'Hỗ trợ ăn uống'],
    certificates: ['Chứng chỉ y tá', 'Chứng chỉ vật lý trị liệu'],
    verifiedLevel: 2,
    ratingAvg: 4.9,
    ratingCount: 134,
    hourlyRateHint: 125000,
    serviceTypes: ['elderly', 'patient'],
    location: {
      latitude: 10.7500,
      longitude: 106.6900,
      address: 'Quận 7, TP.HCM',
    },
  },
];

export const mockReviews: { [careproId: string]: Review[] } = {
  '1': [
    {
      id: 'r1',
      raterName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Rất chuyên nghiệp và tận tâm. Chăm sóc bệnh nhân rất cẩn thận.',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'r2',
      raterName: 'Trần Thị B',
      rating: 5,
      comment: 'Điều dưỡng viên tốt, có kinh nghiệm và kỹ năng tốt.',
      createdAt: new Date('2024-01-10'),
    },
  ],
  '2': [
    {
      id: 'r3',
      raterName: 'Lê Văn C',
      rating: 5,
      comment: 'Chăm sóc người già rất chu đáo, gia đình tôi rất hài lòng.',
      createdAt: new Date('2024-01-20'),
    },
  ],
  '3': [
    {
      id: 'r4',
      raterName: 'Phạm Thị D',
      rating: 5,
      comment: 'Bảo mẫu tuyệt vời, yêu trẻ và có kinh nghiệm chăm sóc trẻ sơ sinh.',
      createdAt: new Date('2024-01-18'),
    },
  ],
};

// Mock function để tính FitScore
export const calculateFitScore = (
  carepro: CarePro,
  jobRequirements: {
    serviceType?: string;
    skills?: string[];
    budgetMin?: number;
    budgetMax?: number;
    location?: { latitude: number; longitude: number };
  }
): number => {
  let score = 0;

  // Skills match (40%)
  if (jobRequirements.skills && jobRequirements.skills.length > 0) {
    const matchedSkills = carepro.skills.filter((skill) =>
      jobRequirements.skills!.includes(skill)
    ).length;
    const skillScore = matchedSkills / jobRequirements.skills.length;
    score += skillScore * 0.4;
  } else {
    score += 0.4; // No skill requirement = full score
  }

  // Service type match
  if (jobRequirements.serviceType) {
    if (carepro.serviceTypes.includes(jobRequirements.serviceType)) {
      score += 0.1;
    }
  }

  // Rating (10%)
  score += (carepro.ratingAvg / 5) * 0.1;

  // Experience (15%)
  score += Math.min(carepro.yearsExp / 10, 1) * 0.15;

  // Price (10%)
  if (jobRequirements.budgetMin && jobRequirements.budgetMax) {
    const avgBudget = (jobRequirements.budgetMin + jobRequirements.budgetMax) / 2;
    const priceDiff = Math.abs(carepro.hourlyRateHint - avgBudget) / avgBudget;
    score += Math.max(0, 1 - priceDiff) * 0.1;
  } else {
    score += 0.1;
  }

  // Distance (15% - simplified)
  if (jobRequirements.location && carepro.location) {
    // Mock distance calculation
    const distance = Math.random() * 5; // 0-5km
    const distanceScore = Math.max(0, 1 - distance / 10);
    score += distanceScore * 0.15;
  } else {
    score += 0.15;
  }

  return Math.min(1, score);
};

