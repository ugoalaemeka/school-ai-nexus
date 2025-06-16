
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  GraduationCap,
  Users,
  TrendingUp,
  AlertCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

// Sample application data with Nigerian context
const applications = [
  {
    id: 'APP-2025-001',
    studentName: 'Adebayo Temiloluwa Sarah',
    class: 'Primary 1',
    level: 'primary',
    parentName: 'Mr. & Mrs. Adebayo Olumide',
    phone: '+234 807 123 4567',
    email: 'o.adebayo@gmail.com',
    address: 'Victoria Island, Lagos',
    lga: 'Eti-Osa',
    dateApplied: '2025-01-15',
    status: 'pending',
    documents: ['Birth Certificate', 'Immunization Card', 'Passport Photo'],
    previousSchool: 'Little Stars Nursery',
    age: 6,
    gender: 'Female'
  },
  {
    id: 'APP-2025-002',
    studentName: 'Okafor Chukwuemeka David',
    class: 'JSS 1',
    level: 'junior_secondary',
    parentName: 'Chief & Mrs. Okafor Emmanuel',
    phone: '+234 803 987 6543',
    email: 'e.okafor@yahoo.com',
    address: 'Ikoyi, Lagos',
    lga: 'Lagos Island',
    dateApplied: '2025-01-12',
    status: 'approved',
    documents: ['Birth Certificate', 'PSLE Certificate', 'Medical Report', 'Passport Photo'],
    previousSchool: 'Crown Heights Primary School',
    age: 12,
    gender: 'Male'
  },
  {
    id: 'APP-2025-003',
    studentName: 'Lawal Zainab Aisha',
    class: 'Nursery 2',
    level: 'nursery',
    parentName: 'Alhaji & Mrs. Lawal Abdullahi',
    phone: '+234 806 456 7890',
    email: 'a.lawal@gmail.com',
    address: 'Surulere, Lagos',
    lga: 'Surulere',
    dateApplied: '2025-01-18',
    status: 'under_review',
    documents: ['Birth Certificate', 'Immunization Card'],
    previousSchool: 'First Steps Daycare',
    age: 4,
    gender: 'Female'
  },
  {
    id: 'APP-2025-004',
    studentName: 'Adeyemi Oluwaseun Michael',
    class: 'SSS 1',
    level: 'senior_secondary',
    parentName: 'Dr. & Mrs. Adeyemi Babatunde',
    phone: '+234 804 567 8901',
    email: 'b.adeyemi@hotmail.com',
    address: 'Lekki Phase 1, Lagos',
    lga: 'Eti-Osa',
    dateApplied: '2025-01-10',
    status: 'rejected',
    documents: ['Birth Certificate', 'JSSCE Certificate', 'Transfer Certificate', 'Medical Report'],
    previousSchool: 'Excellence Secondary School',
    age: 15,
    gender: 'Male'
  },
  {
    id: 'APP-2025-005',
    studentName: 'Bello Fatima Khadijah',
    class: 'Primary 4',
    level: 'primary',
    parentName: 'Mallam & Mrs. Bello Yusuf',
    phone: '+234 805 678 9012',
    email: 'y.bello@gmail.com',
    address: 'Ikeja, Lagos',
    lga: 'Ikeja',
    dateApplied: '2025-01-20',
    status: 'pending',
    documents: ['Birth Certificate', 'School Report', 'Passport Photo'],
    previousSchool: 'Al-Hikmah Primary School',
    age: 9,
    gender: 'Female'
  }
];

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { variant: 'default' as const, color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800', icon: XCircle },
      under_review: { variant: 'outline' as const, color: 'bg-blue-100 text-blue-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.color} font-medium`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getLevelBadge = (level: string) => {
    const levelColors = {
      nursery: 'bg-purple-100 text-purple-800',
      primary: 'bg-green-100 text-green-800',
      junior_secondary: 'bg-blue-100 text-blue-800',
      senior_secondary: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={`${levelColors[level]} font-medium`}>
        {level.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || app.level === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const statusCounts = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    under_review: applications.filter(app => app.status === 'under_review').length
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    toast.success(`Application ${applicationId} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Admissions</h1>
          <p className="text-gray-600 mt-1">Manage and review student admission applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Applications</p>
                <p className="text-2xl font-bold text-blue-900">{statusCounts.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-900">{statusCounts.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Approved</p>
                <p className="text-2xl font-bold text-green-900">{statusCounts.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Under Review</p>
                <p className="text-2xl font-bold text-orange-900">{statusCounts.under_review}</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Rejected</p>
                <p className="text-2xl font-bold text-red-900">{statusCounts.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by student name, parent name, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] border-green-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[150px] border-green-200">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="nursery">Nursery</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="junior_secondary">JSS</SelectItem>
                  <SelectItem value="senior_secondary">SSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="border-green-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{application.studentName}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(application.status)}
                      {getLevelBadge(application.level)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap className="w-4 h-4 text-green-600" />
                      <span>Class: <strong>{application.class}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-green-600" />
                      <span>Parent: <strong>{application.parentName}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>{application.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{application.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span>Applied: {new Date(application.dateApplied).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Application Details - {application?.id}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {selectedApplication && (
                        <Tabs defaultValue="student" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="student">Student Info</TabsTrigger>
                            <TabsTrigger value="parent">Parent Info</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="student" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Student Name</label>
                                <p className="text-lg font-semibold">{selectedApplication.studentName}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Age</label>
                                <p className="text-lg">{selectedApplication.age} years</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Gender</label>
                                <p className="text-lg">{selectedApplication.gender}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Applying for Class</label>
                                <p className="text-lg font-semibold">{selectedApplication.class}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Previous School</label>
                                <p className="text-lg">{selectedApplication.previousSchool}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Application Date</label>
                                <p className="text-lg">{new Date(selectedApplication.dateApplied).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="parent" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Parent/Guardian Name</label>
                                <p className="text-lg font-semibold">{selectedApplication.parentName}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <p className="text-lg">{selectedApplication.phone}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <p className="text-lg">{selectedApplication.email}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Home Address</label>
                                <p className="text-lg">{selectedApplication.address}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Local Government Area</label>
                                <p className="text-lg">{selectedApplication.lga}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="documents" className="space-y-4">
                            <div className="space-y-3">
                              <h3 className="text-lg font-semibold">Submitted Documents</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedApplication.documents.map((doc, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <FileText className="w-5 h-5 text-green-600" />
                                    <span className="font-medium">{doc}</span>
                                    <Badge className="ml-auto bg-green-100 text-green-800">Submitted</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                      
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        {selectedApplication?.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              className="border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(selectedApplication.id, 'approved')}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600">No applications match your current filters. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
