
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectData {
  subject: string;
  grade: string;
  score: number;
  comment: string;
}

interface SubjectPerformanceProps {
  subjectPerformance: SubjectData[];
  getGradeColor: (grade: string) => string;
}

export function SubjectPerformance({ subjectPerformance, getGradeColor }: SubjectPerformanceProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border shadow-sm">
        <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
          <div className="col-span-1">Subject</div>
          <div className="col-span-1 text-center">Grade</div>
          <div className="col-span-1 text-center">Score</div>
          <div className="col-span-2">Teacher Comments</div>
        </div>
        {subjectPerformance.map((subject, index) => (
          <div key={index} className="grid grid-cols-5 p-4 text-sm border-t items-center hover:bg-muted/20 transition-colors">
            <div className="col-span-1 font-medium">{subject.subject}</div>
            <div className="col-span-1 text-center">
              <Badge 
                variant="outline"
                className={getGradeColor(subject.grade)}
              >
                {subject.grade}
              </Badge>
            </div>
            <div className="col-span-1 text-center">{subject.score}%</div>
            <div className="col-span-2">{subject.comment}</div>
          </div>
        ))}
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Subject Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-full max-w-md">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{subject.subject}</span>
                    <span className="font-medium">{subject.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-primary" 
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
