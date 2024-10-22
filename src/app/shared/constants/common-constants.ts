import { StatusEnum } from '../enum/status.enum';
import { workTypeEnum } from '../enum/workType.enum';

export class CommonConstants {
  public static readonly ResponseType = {
    Success: 'success',
    Error: 'error',
  };

  public static readonly FormStatuses = [
    { value: '', text: 'Chọn trạng thái' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
    { value: StatusEnum.WaitingApproval, text: 'Chờ xác nhận' },
  ];

  public static readonly SearchStatus = [
    { value: '', text: 'Tất cả' },
    { value: StatusEnum.Active, text: 'Hoạt động' },
    { value: StatusEnum.Inactive, text: 'Không hoạt động' },
    { value: StatusEnum.WaitingApproval, text: 'Chờ xác nhận' },
  ];

  public static readonly WorkType = [
    { value: workTypeEnum.Office, text: 'Tại văn phòng' },
    { value: workTypeEnum.Remote, text: 'Làm việc từ xa' },
    { value: workTypeEnum.Hybrid, text: 'Linh hoạt' },
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
    Role: 'role',
    Event: 'event',
    SurveyTemplate: 'surveyTemplate',
    Question: 'question',
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
  { key: 'event', display: 'Sự kiện' },
  { key: 'jobs', display: 'Bảng tin việc làm' },
  { key: 'jobRegister', display: 'Đăng ký ứng tuyển' },
  { key: 'students', display: 'Cựu sinh viên' },
  { key: 'users', display: 'Thành viên' },
  { key: 'statisticsMembers', display: 'Thống kê thành viên' },
  { key: 'statisticsEvents', display: 'Thống kê sự kiện' },
  { key: 'statisticsTraffic', display: 'Thống kê tương tác' },
  { key: 'setting', display: 'Cài đặt' },
  { key: 'major', display: 'Nghề nghiệp' },
  { key: 'role', display: 'Phân quyền' },
];
