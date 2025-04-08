
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface AttendanceCalendarProps {
  isLoading: boolean;
}

// Mock attendance data
const mockAttendanceData = [
  { date: "4/1", status: "present" },
  { date: "4/2", status: "present" },
  { date: "4/3", status: "present" },
  { date: "4/4", status: "present" },
  { date: "4/5", status: "weekend" },
  { date: "4/6", status: "weekend" },
  { date: "4/7", status: "present" },
  { date: "4/8", status: "present" },
  { date: "4/9", status: "late" },
  { date: "4/10", status: "present" },
  { date: "4/11", status: "present" },
  { date: "4/12", status: "weekend" },
  { date: "4/13", status: "weekend" },
  { date: "4/14", status: "present" },
  { date: "4/15", status: "present" },
  { date: "4/16", status: "present" },
  { date: "4/17", status: "absent" },
  { date: "4/18", status: "present" },
  { date: "4/19", status: "weekend" },
  { date: "4/20", status: "weekend" },
  { date: "4/21", status: "present" },
  { date: "4/22", status: "present" },
  { date: "4/23", status: "present" },
  { date: "4/24", status: "present" },
  { date: "4/25", status: "present" },
  { date: "4/26", status: "weekend" },
  { date: "4/27", status: "weekend" },
  { date: "4/28", status: "present" },
];

export function AttendanceCalendar({ isLoading }: AttendanceCalendarProps) {
  if (isLoading) {
    return <Skeleton className="h-[250px] w-full" />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/20 border-green-500 text-green-700";
      case "absent":
        return "bg-red-500/20 border-red-500 text-red-700";
      case "late":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-700";
      case "weekend":
        return "bg-muted/50 border-muted text-muted-foreground";
      default:
        return "bg-muted border-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present":
        return "Present";
      case "absent":
        return "Absent";
      case "late":
        return "Late";
      case "weekend":
        return "Weekend";
      default:
        return status;
    }
  };

  // Calculate attendance statistics
  const stats = mockAttendanceData.reduce(
    (acc, day) => {
      if (day.status === "present") acc.present += 1;
      if (day.status === "absent") acc.absent += 1;
      if (day.status === "late") acc.late += 1;
      return acc;
    },
    { present: 0, absent: 0, late: 0 }
  );

  const totalSchoolDays = stats.present + stats.absent + stats.late;
  const attendanceRate = ((stats.present + stats.late) / totalSchoolDays) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-sm bg-green-500/20 border border-green-500"></div>
          <span className="text-xs">Present</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-sm bg-yellow-500/20 border border-yellow-500"></div>
          <span className="text-xs">Late</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-sm bg-red-500/20 border border-red-500"></div>
          <span className="text-xs">Absent</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-sm bg-muted/50 border border-muted"></div>
          <span className="text-xs">Weekend</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        <div className="text-center text-xs text-muted-foreground">Mon</div>
        <div className="text-center text-xs text-muted-foreground">Tue</div>
        <div className="text-center text-xs text-muted-foreground">Wed</div>
        <div className="text-center text-xs text-muted-foreground">Thu</div>
        <div className="text-center text-xs text-muted-foreground">Fri</div>
        <div className="text-center text-xs text-muted-foreground">Sat</div>
        <div className="text-center text-xs text-muted-foreground">Sun</div>
        
        {mockAttendanceData.map((day, index) => (
          <div 
            key={index}
            className={`aspect-square text-center text-xs rounded-sm border flex items-center justify-center ${getStatusColor(day.status)}`}
            title={`${day.date}: ${getStatusLabel(day.status)}`}
          >
            {day.date.split('/')[1]}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="text-sm font-medium">Attendance Rate</div>
          <div className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
            Present: {stats.present} days
          </Badge>
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">
            Late: {stats.late} days
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-700 hover:bg-red-500/20">
            Absent: {stats.absent} days
          </Badge>
        </div>
      </div>
    </div>
  );
}
