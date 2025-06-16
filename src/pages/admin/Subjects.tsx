
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
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  Award,
  Clock,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { nigerianSubjects } from '@/data/nigerianEducationData';

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    level: '',
    category: '',
    weeksPerTerm: '',
    periodsPerWeek: ''
  });

  const filteredSubjects = nigerianSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || subject.levels.includes(selectedLevel);
    return matchesSearch && matchesLevel;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      toast.success(`Subject "${formData.name}" updated successfully!`);
    } else {
      toast.success(`Subject "${formData.name}" created successfully!`);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      level: '',
      category: '',
      weeksPerTerm: '',
      periodsPerWeek: ''
    });
    setEditingSubject(null);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description || '',
      level: subject.levels[0] || '',
      category: subject.category || 'Core',
      weeksPerTerm: '13',
      periodsPerWeek: '4'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (subject) => {
    toast.success(`Subject "${subject.name}" deleted successfully!`);
  };

  const getLevelBadge = (levels: string[]) => {
    const levelColors = {
      nursery: 'bg-purple-100 text-purple-800',
      primary: 'bg-green-100 text-green-800',
      jss: 'bg-blue-100 text-blue-800',
      sss: 'bg-orange-100 text-orange-800'
    };
    return levels.map((level, index) => (
      <Badge key={index} className={levelColors[level] || 'bg-gray-100 text-gray-800'}>
        {level.toUpperCase()}
      </Badge>
    ));
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      Core: 'bg-red-100 text-red-800',
      Science: 'bg-green-100 text-green-800',
      Arts: 'bg-blue-100 text-blue-800',
      Vocational: 'bg-yellow-100 text-yellow-800',
      Language: 'bg-purple-100 text-purple-800'
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  const subjectStats = {
    total: nigerianSubjects.length,
    nursery: nigerianSubjects.filter(s => s.levels.includes('nursery')).length,
    primary: nigerianSubjects.filter(s => s.levels.includes('primary')).length,
    jss: nigerianSubjects.filter(s => s.levels.includes('jss')).length,
    sss: nigerianSubjects.filter(s => s.levels.includes('sss')).length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
          <p className="text-gray-600 mt-1">Manage academic subjects across all levels</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Subject Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Subject Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., MTH"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Education Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nursery">Nursery</SelectItem>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="jss">Junior Secondary (JSS)</SelectItem>
                      <SelectItem value="sss">Senior Secondary (SSS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core">Core Subject</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Arts">Arts & Humanities</SelectItem>
                      <SelectItem value="Language">Language</SelectItem>
                      <SelectItem value="Vocational">Vocational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weeksPerTerm">Weeks per Term</Label>
                  <Input
                    id="weeksPerTerm"
                    type="number"
                    value={formData.weeksPerTerm}
                    onChange={(e) => setFormData({ ...formData, weeksPerTerm: e.target.value })}
                    placeholder="13"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodsPerWeek">Periods per Week</Label>
                  <Input
                    id="periodsPerWeek"
                    type="number"
                    value={formData.periodsPerWeek}
                    onChange={(e) => setFormData({ ...formData, periodsPerWeek: e.target.value })}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the subject curriculum..."
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  {editingSubject ? 'Update Subject' : 'Create Subject'}
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
                <p className="text-sm font-medium text-blue-600">Total Subjects</p>
                <p className="text-2xl font-bold text-blue-900">{subjectStats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Nursery</p>
                <p className="text-2xl font-bold text-purple-900">{subjectStats.nursery}</p>
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
                <p className="text-2xl font-bold text-green-900">{subjectStats.primary}</p>
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
                <p className="text-2xl font-bold text-blue-900">{subjectStats.jss}</p>
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
                <p className="text-2xl font-bold text-orange-900">{subjectStats.sss}</p>
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
                  placeholder="Search subjects by name or code..."
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

      {/* Subjects by Level */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="nursery">Nursery</TabsTrigger>
          <TabsTrigger value="primary">Primary</TabsTrigger>
          <TabsTrigger value="jss">JSS</TabsTrigger>
          <TabsTrigger value="sss">SSS</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map((subject, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">{subject.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Code: {subject.code}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(subject)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(subject)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getLevelBadge(subject.levels)}
                      <Badge className={getCategoryBadge(subject.category || 'Core')}>
                        {subject.category || 'Core'}
                      </Badge>
                    </div>
                    {subject.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>4 periods/week</span>
                      <span>13 weeks/term</span>
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
              {nigerianSubjects.filter(s => s.levels.includes(level)).map((subject, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{subject.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Code: {subject.code}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(subject)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(subject)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge className={getCategoryBadge(subject.category || 'Core')}>
                        {subject.category || 'Core'}
                      </Badge>
                      {subject.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>4 periods/week</span>
                        <span>13 weeks/term</span>
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

export default Subjects;
