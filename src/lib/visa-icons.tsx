import { Briefcase, GraduationCap, Plane, Heart, Building2, Users, Globe } from 'lucide-react';

export const getVisaIcon = (visaType: string) => {
  const iconMap: Record<string, JSX.Element> = {
    WORK: <Briefcase className="h-8 w-8" />,
    STUDENT: <GraduationCap className="h-8 w-8" />,
    TOURIST: <Plane className="h-8 w-8" />,
    FAMILY: <Heart className="h-8 w-8" />,
    BUSINESS: <Building2 className="h-8 w-8" />,
    INVESTOR: <Building2 className="h-8 w-8" />,
    PERMANENT: <Globe className="h-8 w-8" />,
    OTHER: <Users className="h-8 w-8" />,
  };
  
  return iconMap[visaType] || iconMap.OTHER;
};

export const getVisaGradient = (visaType: string) => {
  const gradientMap: Record<string, string> = {
    WORK: 'from-blue-500 to-indigo-500',
    STUDENT: 'from-green-500 to-emerald-500',
    TOURIST: 'from-orange-500 to-amber-500',
    FAMILY: 'from-pink-500 to-rose-500',
    BUSINESS: 'from-purple-500 to-violet-500',
    INVESTOR: 'from-cyan-500 to-teal-500',
    PERMANENT: 'from-indigo-500 to-purple-500',
    OTHER: 'from-gray-500 to-slate-500',
  };
  
  return gradientMap[visaType] || gradientMap.OTHER;
};

export const getVisaIconClass = (visaType: string) => {
  const classMap: Record<string, string> = {
    WORK: 'text-blue-600',
    STUDENT: 'text-green-600',
    TOURIST: 'text-orange-600',
    FAMILY: 'text-pink-600',
    BUSINESS: 'text-purple-600',
    INVESTOR: 'text-cyan-600',
    PERMANENT: 'text-indigo-600',
    OTHER: 'text-gray-600',
  };
  
  return classMap[visaType] || classMap.OTHER;
};

export const VISA_TYPES = [
  { value: 'WORK', label: 'Work Visa', labelTr: 'Çalışma Vizesi' },
  { value: 'STUDENT', label: 'Student Visa', labelTr: 'Öğrenci Vizesi' },
  { value: 'TOURIST', label: 'Tourist Visa', labelTr: 'Turist Vizesi' },
  { value: 'FAMILY', label: 'Family Visa', labelTr: 'Aile Vizesi' },
  { value: 'BUSINESS', label: 'Business Visa', labelTr: 'İş Vizesi' },
  { value: 'INVESTOR', label: 'Investor Visa', labelTr: 'Yatırımcı Vizesi' },
  { value: 'PERMANENT', label: 'Permanent Residence', labelTr: 'Daimi İkamet' },
  { value: 'OTHER', label: 'Other', labelTr: 'Diğer' },
] as const;
