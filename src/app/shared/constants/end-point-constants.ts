export const EndPointConstants = {
  Dashboard: {
    Index: `dashboard`,
  },
  Dropdown: {
    Major: `dropdowns/majors`,
    User: `dropdowns/users`,
    Role: `dropdowns/roles`,
    NewsType: `dropdowns/news-types`,
    Events: `dropdowns/events`,
    Questions: `dropdowns/questions`,
    SurveyType: `dropdowns/survey-types`,
  },
  Role: {
    Index: `roles`,
  },
  Setting: {
    Index: `settings`,
  },
  Major: {
    Index: `majors`,
  },
  User: {
    Index: `users`,
    ChangePassword: `users/:id/change-password`,
    ExportExcel: 'users/export-excel',
  },
  Student: {
    Index: `students`,
  },
  StudentAchievement: {
    Index: `student-achievements`,
  },
  Auth: {
    Login: `login`,
    Register: `register`,
  },
  News: {
    Index: `news`,
    Like: `news/:id/like`,
    Comment: `news/:id/comments`,
    Confirm: `news/:id/confirm`,
    ExportExcel: 'news/export-excel',
  },
  Forum: {
    Index: `forums`,
    Search: `forums/search`,
  },
  Job: {
    Index: `jobs`,
    Search: `jobs/search`,
    ApplyJob: `jobs/:id/apply-job`,
  },
  Event: {
    Index: 'events',
    UserRegister: 'events/:id/user-registers',
    Register: 'events/:id/registers',
    ExportExcel: 'events/export-excel',
  },
  Statistics: {
    Index: 'statistics',
    EventByMonth: 'statistics/event-by-month',
    MemberByMonth: 'statistics/member-by-month',
    NewsByMonth: 'statistics/news-by-month',
    StudentByYear: 'statistics/student-by-year',
    StudentByMajor: 'statistics/student-by-major',
  },
  Profile: {
    Index: 'profile',
  },
  Survey: {
    Index: 'surveys',
  },
  Question: {
    Index: 'questions',
  }
};
