import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  image: string;
  isPremium: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 24,
    bio: 'Люблю путешествия, йогу и хорошую музыку 🎵',
    location: 'Москва',
    interests: ['Путешествия', 'Йога', 'Музыка', 'Фотография'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    isPremium: true,
  },
  {
    id: 2,
    name: 'Дмитрий',
    age: 28,
    bio: 'Предприниматель и любитель экстрима',
    location: 'Санкт-Петербург',
    interests: ['Бизнес', 'Спорт', 'Путешествия'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    isPremium: false,
  },
  {
    id: 3,
    name: 'Елена',
    age: 26,
    bio: 'Художница и мечтательница ✨',
    location: 'Москва',
    interests: ['Искусство', 'Кино', 'Книги', 'Кофе'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    isPremium: true,
  },
  {
    id: 4,
    name: 'Максим',
    age: 30,
    bio: 'IT-специалист, люблю активный отдых',
    location: 'Казань',
    interests: ['Технологии', 'Горы', 'Сёрфинг'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
    isPremium: false,
  },
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'discover' | 'likes' | 'premium'>('discover');

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = () => {
    if (currentProfile) {
      setLikedProfiles([...likedProfiles, currentProfile.id]);
    }
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                LoveMatch
              </h1>
            </div>
            <nav className="flex items-center gap-2">
              <Button
                variant={activeTab === 'discover' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('discover')}
                className={activeTab === 'discover' ? 'gradient-primary' : ''}
              >
                <Icon name="Compass" size={20} />
              </Button>
              <Button
                variant={activeTab === 'likes' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('likes')}
                className={activeTab === 'likes' ? 'gradient-primary' : ''}
              >
                <Icon name="Heart" size={20} />
                {likedProfiles.length > 0 && (
                  <Badge className="ml-2 gradient-primary border-0">
                    {likedProfiles.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === 'premium' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('premium')}
                className={activeTab === 'premium' ? 'gradient-secondary' : ''}
              >
                <Icon name="Crown" size={20} />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'discover' && currentProfile && (
          <div className="max-w-md mx-auto">
            <Card className="overflow-hidden border-2 border-border bg-card shadow-2xl">
              <div className="relative">
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-[500px] object-cover"
                />
                {currentProfile.isPremium && (
                  <Badge className="absolute top-4 right-4 gradient-secondary border-0 text-white">
                    <Icon name="Crown" size={16} className="mr-1" />
                    Premium
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <Icon name="MapPin" size={16} />
                    <span>{currentProfile.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-foreground/90">{currentProfile.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest, idx) => (
                    <Badge key={idx} variant="secondary" className="glass-effect">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-2 hover:border-red-500 hover:text-red-500 transition-all"
                    onClick={handlePass}
                  >
                    <Icon name="X" size={28} />
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 gradient-primary hover:scale-105 transition-transform"
                    onClick={handleLike}
                  >
                    <Icon name="Heart" size={28} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all"
                    onClick={() => setShowPremiumDialog(true)}
                  >
                    <Icon name="Zap" size={28} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Мои лайки</h2>
            {likedProfiles.length === 0 ? (
              <Card className="p-12 text-center glass-effect">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">
                  Пока нет лайков. Начните листать профили!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProfiles
                  .filter((p) => likedProfiles.includes(p.id))
                  .map((profile) => (
                    <Card
                      key={profile.id}
                      className="overflow-hidden hover:scale-105 transition-transform cursor-pointer border-2 border-border"
                    >
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-1">
                          {profile.name}, {profile.age}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Icon name="MapPin" size={14} />
                          <span>{profile.location}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 gradient-secondary rounded-full mb-4">
                <Icon name="Crown" size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Premium подписка</h2>
              <p className="text-xl text-muted-foreground">
                Получи больше возможностей для знакомств
              </p>
            </div>

            <Card className="p-8 glass-effect border-2 border-purple-500/50 mb-6">
              <div className="space-y-6">
                {[
                  {
                    icon: 'Zap',
                    title: 'Безлимитные лайки',
                    description: 'Лайкай без ограничений',
                  },
                  {
                    icon: 'Eye',
                    title: 'Кто лайкнул тебя',
                    description: 'Узнай, кому ты понравился',
                  },
                  {
                    icon: 'TrendingUp',
                    title: 'Приоритетный показ',
                    description: 'Твой профиль увидят первым',
                  },
                  {
                    icon: 'Rewind',
                    title: 'Отмена действий',
                    description: 'Верни случайный свайп',
                  },
                  {
                    icon: 'MapPin',
                    title: 'Смена геолокации',
                    description: 'Знакомься в любом городе',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { duration: '1 месяц', price: '990 ₽', perMonth: '990 ₽/мес' },
                { duration: '3 месяца', price: '2490 ₽', perMonth: '830 ₽/мес', popular: true },
                { duration: '6 месяцев', price: '3990 ₽', perMonth: '665 ₽/мес' },
              ].map((plan, idx) => (
                <Card
                  key={idx}
                  className={`p-6 text-center relative ${
                    plan.popular
                      ? 'gradient-secondary border-0 scale-105'
                      : 'glass-effect border-2 border-border'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-purple-600 border-0">
                      Популярно
                    </Badge>
                  )}
                  <h3
                    className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : ''}`}
                  >
                    {plan.duration}
                  </h3>
                  <p className={`text-3xl font-bold mb-1 ${plan.popular ? 'text-white' : ''}`}>
                    {plan.price}
                  </p>
                  <p
                    className={`text-sm mb-4 ${
                      plan.popular ? 'text-white/80' : 'text-muted-foreground'
                    }`}
                  >
                    {plan.perMonth}
                  </p>
                  <Button
                    className={`w-full ${
                      plan.popular ? 'bg-white text-purple-600 hover:bg-white/90' : 'gradient-primary'
                    }`}
                  >
                    Выбрать
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="glass-effect border-2 border-purple-500/50">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Zap" className="text-purple-500" />
              Суперлайк
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Отправь суперлайк и покажи особый интерес! Человек увидит, что ты действительно
              заинтересован.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <Icon name="Crown" size={16} className="inline mr-1" />
                Premium пользователи получают 5 суперлайков в день
              </p>
            </div>
            <Button className="w-full gradient-secondary">
              Отправить суперлайк
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
