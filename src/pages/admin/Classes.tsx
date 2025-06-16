
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  School,
  Award,
  Clock,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { nigerianClasses } from '@/data/nigerianEducationData';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    description: '',
    capacity: '',
    academicYear: '2024/2025'
  });

  const filteredClasses = nigerianClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || cls.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      toast.success(`Class "${formData.name}" updated successfully!`);
    } else {
      toast.success(`Class "${formData.name}" created successfully!`);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      grade: '',
      description: '',
      capacity: '',
      academicYear: '2024/2025'
    });
    setEditingClass(null);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      grade: cls.grade,
      description: cls.description || '',
      capacity: '35',
      academicYear: '2024/2025'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (cls) => {
    toast.success(`Class "${cls.name}" deleted successfully!`);
  };

  const getLevelBadge = (level: string) => {
    const levelColors = {
      nursery: 'bg-purple-100 text-purple-800',
      primary: 'bg-green-100 text-green-800',
      jss: 'bg-blue-100 text-blue-800',
      sss: 'bg-orange-100 text-orange-800'
    };
    return levelColors[level] || 'bg-gray-100 text-gray-800';
  };

  const classStats = {
    total: nigerianClasses.length,
    nursery: nigerianClasses.filter(c => c.level === 'nursery').length,
    primary: nigerianClasses.filter(c => c.level === 'primary').length,
    jss: nigerianClasses.filter(c => c.level === 'jss').length,
    sss: nigerianClasses.filter(c => c.level === 'sss').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Levels Management</h1>
          <p className="text-gray-600 mt-1">Manage classes across Nursery, Primary and Secondary levels</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., JSS 1A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level *</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nursery 1">Nursery 1</SelectItem>
                      <SelectItem value="Nursery 2">Nursery 2</SelectItem>
                      <SelectItem value="Reception">Reception</SelectItem>
                      <SelectItem value="Primary 1">Primary 1</SelectItem>
                      <SelectItem value="Primary 2">Primary 2</SelectItem>
                      <SelectItem value="Primary 3">Primary 3</SelectItem>
                      <SelectItem value="Primary 4">Primary 4</SelectItem>
                      <SelectItem value="Primary 5">Primary 5</SelectItem>
                      <SelectItem value="Primary 6">Primary 6</SelectItem>
                      <SelectItem value="JSS 1">JSS 1</SelectItem>
                      <SelectItem value="JSS 2">JSS 2</SelectItem>
                      <SelectItem value="JSS 3">JSS 3</SelectItem>
                      <SelectItem value="SSS 1">SSS 1</SelectItem>
                      <SelectItem value="SSS 2">SSS 2</SelectItem>
                      <SelectItem value="SSS 3">SSS 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Class Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="35"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    placeholder="2024/2025"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the class..."
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  {editingClass ? 'Update Class' : 'Create Class'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Classes</p>
                <p className="text-2xl font-bold text-blue-900">{classStats.total}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Nursery</p>
                <p className="text-2xl font-bold text-purple-900">{classStats.nursery}</p>
              </div>
              <School className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Primary</p>
                <p className="text-2xl font-bold text-green-900">{classStats.primary}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">JSS</p>
                <p className="text-2xl font-bold text-blue-900">{classStats.jss}</p>
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
                <p className="text-2xl font-bold text-orange-900">{classStats.sss}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
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
                  placeholder="Search classes by name or grade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px] border-purple-200">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="nursery">Nursery</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="jss">JSS</SelectItem>
                  <SelectItem value="sss">SSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes by Level */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="nursery">Nursery</TabsTrigger>
          <TabsTrigger value="primary">Primary</TabsTrigger>
          <TabsTrigger value="jss">JSS</TabsTrigger>
          <TabsTrigger value="sss">SSS</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((cls, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">{cls.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Grade: {cls.grade}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(cls)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(cls)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getLevelBadge(cls.level)}>
                        {cls.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        35 Students
                      </Badge>
                    </div>
                    {cls.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{cls.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Capacity: 35</span>
                      <span>2024/2025 Session</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Assign Class Teacher
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['nursery', 'primary', 'jss', 'sss'].map(level => (
          <TabsContent key={level} value={level} className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nigerianClasses.filter(c => c.level === level).map((cls, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{cls.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Grade: {cls.grade}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(cls)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(cls)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline">
                        35 Students
                      </Badge>
                      {cls.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{cls.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Capacity: 35</span>
                        <span>2024/2025 Session</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Assign Class Teacher
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Classes;
