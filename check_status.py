#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
簡易版決定論的チェックスクリプト
"""

import re
import glob
from collections import Counter

def check_rule_3_1():
    """Rule 3.1: JavaScript alert/confirm チェック"""
    print("\n[Rule 3.1: JavaScript alert/confirm]")
    
    untranslated = []
    html_files = glob.glob("*.html")
    
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            # alert()の行を抽出
            lines = content.split('\n')
            for line_num, line in enumerate(lines, 1):
                # alert()またはconfirm()を含む行
                if 'alert(' in line or 'confirm(' in line:
                    # window.i18nを使っている場合はOK
                    if 'window.i18n(' in line:
                        continue
                    # フォールバック用の三項演算子（window.i18n ? ... : '...'）もOK
                    if 'window.i18n ?' in line or 'window.i18n?' in line:
                        continue
                    # 日本語を含み、かつ上記に該当しない場合は未翻訳
                    if re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]', line):
                        match = re.search(r"alert\(['\"]([^'\"]+)", line)
                        if match:
                            untranslated.append(f"{file}:{line_num}: {match.group(1)[:50]}")
    
    if untranslated:
        print(f"❌ 未翻訳alert: {len(untranslated)}件")
        for item in untranslated[:5]:  # 最初の5件のみ表示
            print(f"   - {item}")
        return False
    else:
        print("✅ すべてのalertが翻訳対応済み")
        return True

def check_rule_4_1():
    """Rule 4.1: 翻訳キーの重複チェック"""
    print("\n[Rule 4.1: 翻訳キーの重複]")
    
    with open('js/i18n.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    all_pass = True
    for lang in ['ja', 'en', 'zh']:
        if lang == 'ja':
            section = re.search(r'ja:\s*\{(.*?)\},\s*en:', content, re.DOTALL)
        elif lang == 'en':
            section = re.search(r'en:\s*\{(.*?)\},\s*zh:', content, re.DOTALL)
        else:
            section = re.search(r'zh:\s*\{(.*?)\}\s*\}', content, re.DOTALL)
        
        if section:
            keys = re.findall(r"'([^']+)':\s*'", section.group(1))
            key_counts = Counter(keys)
            duplicates = {k: v for k, v in key_counts.items() if v > 1}
            
            if duplicates:
                print(f"❌ [{lang}] 重複キー: {len(duplicates)}件")
                for key, count in list(duplicates.items())[:5]:  # 最初の5件
                    print(f"   - '{key}' → {count}回")
                all_pass = False
            else:
                print(f"✅ [{lang}] 重複なし")
    
    return all_pass

def main():
    print("=" * 80)
    print("翻訳対応チェック - 現状確認")
    print("=" * 80)
    
    rule_3_1 = check_rule_3_1()
    rule_4_1 = check_rule_4_1()
    
    print("\n" + "=" * 80)
    print("総合結果")
    print("=" * 80)
    
    passed = 0
    total = 2
    
    if rule_3_1:
        passed += 1
    if rule_4_1:
        passed += 1
    
    print(f"合格: {passed}/{total}")
    
    if passed == total:
        print("\n✅ すべてのチェックに合格しました！")
    else:
        print(f"\n⚠️  {total - passed}件の問題が残っています")
    
    return passed == total

if __name__ == "__main__":
    main()
