
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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

interface PastTermReportsProps {
  reportCards: ReportCardData[];
  getGradeColor: (grade: string) => string;
}

export function PastTermReports({ reportCards, getGradeColor }: PastTermReportsProps) {
  return (
    <div className="space-y-4">
      {reportCards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No past report cards available</p>
        </div>
      ) : (
        <div className="rounded-md border shadow-sm">
          <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
            <div className="col-span-2">Report Card</div>
            <div className="col-span-1 text-center">Term</div>
            <div className="col-span-1 text-center">Issue Date</div>
            <div className="col-span-1 text-center">Grade</div>
            <div className="col-span-1 text-center">Action</div>
          </div>
          {reportCards.map((report) => (
            <div key={report.id} className="grid grid-cols-6 p-4 text-sm border-t items-center hover:bg-muted/20 transition-colors">
              <div className="col-span-2">
                <div className="font-medium">{report.title}</div>
                <div className="text-xs text-muted-foreground">{report.id}</div>
              </div>
              <div className="col-span-1 text-center">{report.term} {report.year}</div>
              <div className="col-span-1 text-center">{report.dateIssued}</div>
              <div className="col-span-1 text-center">
                <Badge 
                  variant="outline"
                  className={getGradeColor(report.grade)}
                >
                  {report.grade} ({report.percentage})
                </Badge>
              </div>
              <div className="col-span-1 text-center">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
