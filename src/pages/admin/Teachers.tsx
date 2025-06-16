
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  School,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  User,
  Download,
  BookOpen,
  Award,
  Clock,
  UserCheck
} from 'lucide-react';
import { sampleNigerianTeachers } from '@/data/nigerianTeacherData';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = sampleNigerianTeachers.filter(teacher => {
    const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subjectsTeaching.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || teacher.subjectsTeaching.includes(selectedSubject);
    const matchesStatus = selectedStatus === 'all' || teacher.employmentStatus === selectedStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const teacherStats = {
    total: sampleNigerianTeachers.length,
    active: sampleNigerianTeachers.filter(t => t.employmentStatus === 'Active').length,
    partTime: sampleNigerianTeachers.filter(t => t.employmentStatus === 'Part-time').length,
    probation: sampleNigerianTeachers.filter(t => t.employmentStatus === 'Probation').length,
    male: sampleNigerianTeachers.filter(t => t.gender === 'Male').length,
    female: sampleNigerianTeachers.filter(t => t.gender === 'Female').length
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Part-time': 'bg-blue-100 text-blue-800',
      'Probation': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getGenderColor = (gender: string) => {
    return gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers & Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage teaching and non-teaching staff members</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Teacher
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Teachers</p>
                <p className="text-2xl font-bold text-blue-900">{teacherStats.total}</p>
              </div>
              <School className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active</p>
                <p className="text-2xl font-bold text-green-900">{teacherStats.active}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Part-time</p>
                <p className="text-2xl font-bold text-blue-900">{teacherStats.partTime}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Probation</p>
                <p className="text-2xl font-bold text-yellow-900">{teacherStats.probation}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Male</p>
                <p className="text-2xl font-bold text-purple-900">{teacherStats.male}</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Female</p>
                <p className="text-2xl font-bold text-pink-900">{teacherStats.female}</p>
              </div>
              <User className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-purple-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by teacher name, ID, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[150px] border-purple-200">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English Language">English Language</SelectItem>
                  <SelectItem value="Basic Science">Basic Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Yoruba Language">Yoruba Language</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px] border-purple-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Probation">Probation</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTeachers.map((teacher, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-purple-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Teacher Header */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600">
                    <AvatarFallback className="text-white font-bold">
                      {teacher.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{teacher.fullName}</h3>
                    <p className="text-sm text-gray-600">ID: {teacher.teacherId}</p>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjectsTeaching.slice(0, 2).map((subject, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {teacher.subjectsTeaching.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{teacher.subjectsTeaching.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span>{teacher.classAssigned}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-purple-600" />
                    <Badge className={getGenderColor(teacher.gender)}>
                      {teacher.gender}
                    </Badge>
                    <Badge className={getStatusColor(teacher.employmentStatus)}>
                      {teacher.employmentStatus}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-purple-600" />
                    <span>{teacher.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-purple-600" />
                    <span className="truncate">{teacher.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="truncate">{teacher.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Started: {teacher.dateOfEmployment}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Teacher Profile - {selectedTeacher?.fullName}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {selectedTeacher && (
                        <Tabs defaultValue="personal" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="professional">Professional</TabsTrigger>
                            <TabsTrigger value="subjects">Subjects</TabsTrigger>
                            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="personal" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <p className="text-lg font-semibold">{selectedTeacher.fullName}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Teacher ID</label>
                                <p className="text-lg">{selectedTeacher.teacherId}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Gender</label>
                                <p className="text-lg">{selectedTeacher.gender}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                <p className="text-lg">{selectedTeacher.dateOfBirth}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <p className="text-lg">{selectedTeacher.phoneNumber}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <p className="text-lg">{selectedTeacher.email}</p>
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">Home Address</label>
                                <p className="text-lg">{selectedTeacher.address}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="professional" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Employment Status</label>
                                <p className="text-lg font-semibold">{selectedTeacher.employmentStatus}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Date of Employment</label>
                                <p className="text-lg">{selectedTeacher.dateOfEmployment}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Class Assigned</label>
                                <p className="text-lg">{selectedTeacher.classAssigned}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Years of Experience</label>
                                <p className="text-lg">{selectedTeacher.yearsOfExperience} years</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="subjects" className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-600">Subjects Teaching</label>
                              <div className="flex flex-wrap gap-2">
                                {selectedTeacher.subjectsTeaching.map((subject, idx) => (
                                  <Badge key={idx} className="bg-purple-100 text-purple-800">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="qualifications" className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-600">Qualifications</label>
                              <div className="space-y-2">
                                {selectedTeacher.qualifications.map((qual, idx) => (
                                  <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                                    <p className="font-medium">{qual}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card className="border-purple-200">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <School className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
            <p className="text-gray-600">No teachers match your current search criteria. Try adjusting your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Teachers;
