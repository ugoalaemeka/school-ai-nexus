
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
  Users,
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
  Clock
} from 'lucide-react';
import { sampleNigerianStudents } from '@/data/nigerianStudentData';
import { nigerianClasses } from '@/data/nigerianEducationData';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = sampleNigerianStudents.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.currentClass === selectedClass;
    const matchesGender = selectedGender === 'all' || student.gender === selectedGender;
    return matchesSearch && matchesClass && matchesGender;
  });

  const studentStats = {
    total: sampleNigerianStudents.length * 35, // Estimate total students
    male: Math.floor(sampleNigerianStudents.length * 35 * 0.52),
    female: Math.floor(sampleNigerianStudents.length * 35 * 0.48),
    nursery: sampleNigerianStudents.filter(s => s.currentClass.startsWith('Nursery')).length * 8,
    primary: sampleNigerianStudents.filter(s => s.currentClass.startsWith('Primary')).length * 12,
    jss: sampleNigerianStudents.filter(s => s.currentClass.startsWith('JSS')).length * 8,
    sss: sampleNigerianStudents.filter(s => s.currentClass.startsWith('SSS')).length * 7
  };

  const getGenderColor = (gender: string) => {
    return gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800';
  };

  const getClassLevel = (className: string) => {
    if (className.startsWith('Nursery')) return 'Nursery';
    if (className.startsWith('Primary')) return 'Primary';
    if (className.startsWith('JSS')) return 'JSS';
    if (className.startsWith('SSS')) return 'SSS';
    return 'Unknown';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Nursery': 'bg-purple-100 text-purple-800',
      'Primary': 'bg-green-100 text-green-800',
      'JSS': 'bg-blue-100 text-blue-800',
      'SSS': 'bg-orange-100 text-orange-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage all students across Nursery, Primary and Secondary levels</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-900">{studentStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Nursery</p>
                <p className="text-2xl font-bold text-purple-900">{studentStats.nursery}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Primary</p>
                <p className="text-2xl font-bold text-green-900">{studentStats.primary}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">JSS</p>
                <p className="text-2xl font-bold text-blue-900">{studentStats.jss}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">SSS</p>
                <p className="text-2xl font-bold text-orange-900">{studentStats.sss}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Gender Ratio</p>
              <div className="flex justify-center gap-2 mt-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-900">{Math.round((studentStats.male / studentStats.total) * 100)}%</p>
                  <p className="text-xs text-blue-600">Male</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-pink-900">{Math.round((studentStats.female / studentStats.total) * 100)}%</p>
                  <p className="text-xs text-pink-600">Female</p>
                </div>
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
                  placeholder="Search by student name, ID, or parent name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-400"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[150px] border-green-200">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {nigerianClasses.map(cls => (
                    <SelectItem key={cls.name} value={cls.name}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[120px] border-green-200">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gender</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStudents.map((student, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-green-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Student Header */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600">
                    <AvatarFallback className="text-white font-bold">
                      {student.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{student.fullName}</h3>
                    <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                  </div>
                </div>

                {/* Student Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{student.currentClass}</span>
                    <Badge className={getLevelColor(getClassLevel(student.currentClass))}>
                      {getClassLevel(student.currentClass)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-green-600" />
                    <span>Age: {student.age}</span>
                    <Badge className={getGenderColor(student.gender)}>
                      {student.gender}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-green-600" />
                    <span className="truncate">{student.parentName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{student.parentPhone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="truncate">{student.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>Enrolled: {student.enrollmentDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Student Profile - {selectedStudent?.fullName}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {selectedStudent && (
                        <Tabs defaultValue="personal" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="personal">Personal Info</TabsTrigger>
                            <TabsTrigger value="academic">Academic</TabsTrigger>
                            <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="personal" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <p className="text-lg font-semibold">{selectedStudent.fullName}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Student ID</label>
                                <p className="text-lg">{selectedStudent.studentId}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Age</label>
                                <p className="text-lg">{selectedStudent.age} years</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Gender</label>
                                <p className="text-lg">{selectedStudent.gender}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Home Address</label>
                                <p className="text-lg">{selectedStudent.address}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Enrollment Date</label>
                                <p className="text-lg">{selectedStudent.enrollmentDate}</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="academic" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Current Class</label>
                                <p className="text-lg font-semibold">{selectedStudent.currentClass}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Academic Level</label>
                                <p className="text-lg">{getClassLevel(selectedStudent.currentClass)}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Academic Session</label>
                                <p className="text-lg">2024/2025</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Current Term</label>
                                <p className="text-lg">Second Term</p>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="parent" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Parent/Guardian Name</label>
                                <p className="text-lg font-semibold">{selectedStudent.parentName}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <p className="text-lg">{selectedStudent.parentPhone}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <p className="text-lg">{selectedStudent.parentEmail}</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Occupation</label>
                                <p className="text-lg">{selectedStudent.parentOccupation}</p>
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
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-600">No students match your current search criteria. Try adjusting your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Students;
