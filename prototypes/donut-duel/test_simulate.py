import unittest
from simulate import Game, CARDS, validate


class Mechanics(unittest.TestCase):
    def setUp(self):
        self.g = Game(42, first=0)
        self.g.round = 3
        self.g.turn = 0
        for s in self.g.players:
            s['board'] = []
            s['hand'] = []
            s['fuel'] = 7

    def add(self, p, cid, old=True):
        x = self.g.enter(p, cid)
        if old:
            x['born'] = 1
        return x

    def test_deck_legality(self):
        validate()

    def test_florida_regular_and_passive_stack_once(self):
        x = self.add(0, 'P012')
        self.g.execute(('leader', x['uid']), 0)
        self.assertEqual((x['damage'], self.g.power(x), self.g.players[0]['charge']), (1, 7, 1))
        self.g.damage(x, 1)
        self.assertEqual(self.g.players[0]['charge'], 1)

    def test_lethal_self_damage_does_not_charge(self):
        x = self.add(0, 'P001')
        self.g.execute(('leader', x['uid']), 0)
        self.assertIsNone(self.g.obj(x['uid']))
        self.assertEqual(self.g.players[0]['charge'], 0)

    def test_hothead_does_not_enable_rotate_abilities(self):
        x = self.add(0, 'P003', old=False)
        x['hot'] = True
        self.add(0, 'P012')
        actions = self.g.actions(0)
        self.assertTrue(any(a[:2] == ('attack', x['uid']) for a in actions))
        self.assertFalse(any(a[:2] == ('activate', x['uid']) for a in actions))

    def test_vulnerable_leader_cannot_block(self):
        a = self.add(0, 'P012')
        self.add(1, 'P129')
        self.g.players[1]['ready'] = False
        self.g.execute(('attack', a['uid'], -1, False), 0)
        self.assertEqual(self.g.players[1]['hp'], 21)
        self.assertEqual(self.g.players[1]['charge'], 0)

    def test_guard_discard_absorbs_damage_and_surviving_block_charges(self):
        self.g.hoa_charge = 'block'
        a = self.add(0, 'P012')
        b = self.add(1, 'P128', old=False)
        self.g.players[1]['hand'] = ['P139']
        self.g.combat(a['uid'], -1, (b['uid'],), 1, b['uid'])
        self.assertEqual(b['damage'], 3)
        self.assertEqual(self.g.players[1]['charge'], 1)
        self.assertIsNone(self.g.obj(a['uid']))
        self.assertEqual(self.g.players[1]['hand'], [])

    def test_overflow_and_zero_damage_second_blocker_retaliates(self):
        self.g.hoa_charge = 'block'
        a = self.add(0, 'P012')
        b = self.add(1, 'P129')
        c = self.add(1, 'P128')
        self.g.combat(a['uid'], -1, (b['uid'], c['uid']), 0, b['uid'])
        self.assertEqual(c['damage'], 0)
        self.assertIsNone(self.g.obj(a['uid']))
        self.assertEqual(self.g.players[1]['hp'], 25)
        self.assertEqual(self.g.players[1]['charge'], 1)

    def test_explosive_retaliates_when_defeated_blocking(self):
        a = self.add(1, 'P128')
        b = self.add(0, 'P005')
        self.g.turn = 1
        self.g.combat(a['uid'], -1, (b['uid'],))
        self.assertIsNone(self.g.obj(b['uid']))
        self.assertEqual(a['damage'], 1)
        self.assertEqual(self.g.players[0]['hp'], 24)

    def test_direct_attack_survival_does_not_charge_hoa(self):
        a = self.add(0, 'P013')
        b = self.add(1, 'P129')
        b['ready'] = False
        self.g.combat(a['uid'], b['uid'])
        self.assertEqual(self.g.players[1]['charge'], 0)

    def test_experimental_charge_uses_opponents_turn_survived_damage_only(self):
        self.g.hoa_charge = 'damage'
        x = self.add(1, 'P129')
        self.g.turn = 1
        self.g.damage(x, 1)
        self.assertEqual(self.g.players[1]['charge'], 0)
        self.g.turn = 0
        self.g.damage(x, 1)
        self.assertEqual(self.g.players[1]['charge'], 1)
        self.g.damage(x, 1)
        self.assertEqual(self.g.players[1]['charge'], 1)

    def test_hoa_charges_from_first_board_activation_only(self):
        self.g.hoa_charge = 'activate'
        healer = self.add(1, 'P124')
        target = self.add(1, 'P129')
        target['damage'] = 2
        self.g.execute(('activate', healer['uid'], target['uid']), 1)
        self.assertEqual(self.g.players[1]['charge'], 1)
        tape = self.g.enter(1, 'P117', target['uid'])
        target['damage'] = 1
        self.g.execute(('activate', tape['uid'], target['uid']), 1)
        self.assertEqual(self.g.players[1]['charge'], 1)

    def test_hoa_leader_ability_does_not_charge(self):
        target = self.add(1, 'P129')
        target['damage'] = 2
        self.g.execute(('leader', target['uid']), 1)
        self.assertEqual(self.g.players[1]['charge'], 0)

    def test_ultimate_spends_charge_and_rolls_in_range(self):
        self.g.players[0]['charge'] = 3
        self.g.execute(('ultimate', -1), 0)
        self.assertTrue(19 <= self.g.players[1]['hp'] <= 24)
        self.assertEqual(self.g.players[0]['charge'], 0)
        self.assertFalse(self.g.players[0]['ready'])
        self.assertFalse(any(a[0] in ('leader', 'ultimate') for a in self.g.actions(0)))

    def test_charge_cap_and_once_per_round(self):
        s = self.g.players[0]
        s['charge'] = 3
        self.g.gain(0)
        s['charge'] = 0
        self.g.gain(0)
        self.assertEqual(s['charge'], 0)

    def test_tag_me_in_is_new_instance_and_cleans_items(self):
        x = self.add(0, 'P151')
        x['damage'] = 1
        self.g.enter(0, 'P178', x['uid'])
        self.g.players[0]['hand'] = ['P172', 'P151']
        self.g.execute(('tag', 'P172', x['uid'], 'P151'), 0)
        y = self.g.chars(0)[0]
        self.assertNotEqual(y['uid'], x['uid'])
        self.assertEqual(y['damage'], 0)
        self.assertTrue(y['hot'])
        self.assertTrue(self.g.can_attack(y))
        self.assertIn('P178', self.g.players[0]['discard'])
        self.assertIn('P151', self.g.players[0]['hand'])

    def test_attack_self_damage_bonus_before_combat(self):
        x = self.add(0, 'P002')
        self.g.execute(('attack', x['uid'], -1, True), 0)
        self.assertEqual(self.g.players[1]['hp'], 19)
        self.assertEqual(self.g.players[0]['charge'], 1)

    def test_planning_does_not_read_toddler_top_card(self):
        x = self.add(0, 'P005')
        a, b = self.g.fork(), self.g.fork()
        a.players[0]['deck'][-1] = 'P001'
        b.players[0]['deck'][-1] = 'P010'
        for g in (a, b):
            g.execute(('attack', x['uid'], -1, False), 0)
        self.assertEqual(a.players[1]['hp'], b.players[1]['hp'])


if __name__ == '__main__':
    unittest.main()
