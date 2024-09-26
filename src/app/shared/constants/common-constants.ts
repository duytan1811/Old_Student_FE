import { StatusEnum } from '../enum/status.enum';

export class CommonConstants {
  public static readonly ResponseType = {
    Success: 'success',
    Error: 'error',
  };

  public static readonly FormStatuses = [
    { value: '', text: 'Chọn trạng thái' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
  ];

  public static readonly SearchStatus = [
    { value: '', text: 'Tất cả' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
  ];

  public static readonly MenuKey = {
    Forum: 'forum',
    News: 'news',
    Job: 'jobs',
    Major: 'major',
    JobRegister: 'jobRegister',
    Student: 'students',
    User: 'users',
    StatisticsMember: 'statisticsMembers',
    StatisticsEvent: 'statisticsEvents',
    StatisticsTraffic: 'statisticsTraffic',
    Setting: 'setting',
  };
}

export const ClaimValue = {
  View: '1',
  Create: '2',
  Edit: '3',
  Delete: '4',
};

export const MenuList = [
  { key: 'forum', display: 'Diễn đàn' },
  { key: 'news', display: 'Tin tức' },
  { key: 'jobs', display: 'Bảng tin việc làm' },
  { key: 'jobRegister', display: 'Đăng ký ứng tuyển' },
  { key: 'students', display: 'Cựu sinh viên' },
  { key: 'users', display: 'Thành viên' },
  { key: 'statisticsMembers', display: 'Thống kê thành viên' },
  { key: 'statisticsEvents', display: 'Thống kê sự kiện' },
  { key: 'statisticsTraffic', display: 'Thống kê tương tác' },
  { key: 'setting', display: 'Cài đặt' },
];
