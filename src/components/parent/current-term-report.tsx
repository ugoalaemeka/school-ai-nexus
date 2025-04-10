
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

interface ReportCardData {
  id: string;
  title: string;
  year: string;
  term: string;
  dateIssued: string;
  grade: string;
  percentage: string;
  status: string;
}

interface CurrentTermReportProps {
  reportCards: ReportCardData[];
  getGradeColor: (grade: string) => string;
}

export function CurrentTermReport({ reportCards, getGradeColor }: CurrentTermReportProps) {
  return (
    <div className="space-y-4">
      {reportCards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No current term report cards available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reportCards.map((report) => (
            <div key={report.id} className="rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold">{report.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {report.dateIssued}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Grade</div>
                    <div className={`text-lg font-bold py-1 px-3 rounded border ${getGradeColor(report.grade)}`}>
                      {report.grade}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Average</div>
                    <div className="text-lg font-bold">{report.percentage}</div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <ul className="text-sm space-y-1">
                      <li>• Outstanding in Science experiments</li>
                      <li>• Creative problem-solving in Math</li>
                      <li>• Exceptional art portfolio work</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Areas for Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <ul className="text-sm space-y-1">
                      <li>• More consistent homework completion</li>
                      <li>• Historical analysis needs improvement</li>
                      <li>• Participate more in class discussions</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">Teacher Comments</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm">
                      Sarah is a bright and motivated student who consistently 
                      produces high-quality work. She excels in both analytical 
                      and creative tasks. With continued focus on time management, 
                      she can reach even greater achievements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
